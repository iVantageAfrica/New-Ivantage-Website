import { createClient } from "@supabase/supabase-js";

import type { Inquiry } from "./inquiry-schema";

const SUPPORT_EMAIL = "support@ivantage.africa";
const MAIL_ENDPOINT: string = import.meta.env["VITE_INQUIRY_MAIL_ENDPOINT"] ?? "/mailer/mail.php";

// Publishable key only, and only used for inserts: visitors can add an inquiry,
// never read one back.
function insertOnlyClient() {
  const url: string | undefined = import.meta.env["VITE_SUPABASE_URL"];
  const key: string | undefined = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return undefined;

  return createClient(url, key, {
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
}

async function storeInquiry(data: Inquiry) {
  const client = insertOnlyClient();
  if (!client) {
    console.error("Inquiry storage skipped: Supabase env vars are missing");
    return false;
  }

  const { error } = await client.from("project_inquiries").insert(data);
  if (error) {
    console.error("Inquiry storage failed", error.code);
    return false;
  }
  return true;
}

async function sendInquiryEmail(data: Inquiry) {
  try {
    const response = await fetch(MAIL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

export async function submitInquiry(data: Inquiry) {
  const [stored, mailed] = await Promise.all([storeInquiry(data), sendInquiryEmail(data)]);
  if (!stored && !mailed) {
    throw new Error(
      `Your inquiry could not be sent. Please try again or email ${SUPPORT_EMAIL} directly.`,
    );
  }
  return { saved: true };
}
