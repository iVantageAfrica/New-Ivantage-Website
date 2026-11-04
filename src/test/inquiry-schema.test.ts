import { describe, expect, it } from "vitest";
import { inquirySchema } from "../lib/inquiry-schema";
const valid = {
  full_name: "Ada Okoro",
  work_email: "ada@example.com",
  company: "Example Company",
  project_type: "Web application",
  description: "We need a new customer-facing web application.",
};
describe("Contact inquiry validation", () => {
  it("accepts all five requested fields", () => {
    expect(inquirySchema.parse(valid)).toEqual(valid);
  });
  it("rejects missing full name", () => {
    expect(inquirySchema.safeParse({ ...valid, full_name: "" }).success).toBe(false);
  });
  it("rejects invalid work email", () => {
    expect(inquirySchema.safeParse({ ...valid, work_email: "invalid" }).success).toBe(false);
  });
  it("rejects missing company", () => {
    expect(inquirySchema.safeParse({ ...valid, company: "" }).success).toBe(false);
  });
  it("rejects missing project type", () => {
    expect(inquirySchema.safeParse({ ...valid, project_type: "" }).success).toBe(false);
  });
  it("rejects missing project description", () => {
    expect(inquirySchema.safeParse({ ...valid, description: "" }).success).toBe(false);
  });
});
