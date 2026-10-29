import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { inquirySchema, type Inquiry } from "./inquiry-schema";

const SUPPORT_EMAIL = "support@ivantage.africa";

async function storeInquiry(data: Inquiry) {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return false;

  const client = createClient(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`)
          headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  const { error } = await client.from("project_inquiries").insert(data);
  if (error) {
    console.error("Inquiry storage failed", error.code);
    return false;
  }
  return true;
}

async function sendInquiryEmail(data: Inquiry) {
  const endpoint = process.env["INQUIRY_MAIL_ENDPOINT"];
  const secret = process.env["INQUIRY_MAIL_SECRET"];
  if (!endpoint || !secret) {
    console.error("Inquiry email skipped: INQUIRY_MAIL_ENDPOINT or INQUIRY_MAIL_SECRET is missing");
    return false;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Inquiry-Secret": secret },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.error("Inquiry email delivery failed", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Inquiry email delivery failed", error instanceof Error ? error.message : error);
    return false;
  }
}

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const [stored, mailed] = await Promise.all([storeInquiry(data), sendInquiryEmail(data)]);
    if (!stored && !mailed) {
      throw new Error(
        `Your inquiry could not be sent. Please try again or email ${SUPPORT_EMAIL} directly.`,
      );
    }
    return { saved: true };
  });
