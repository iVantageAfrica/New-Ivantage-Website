import { z } from 'zod';

export const projectTypes = ['Web application', 'Mobile application', 'Enterprise software', 'UI/UX and product engineering', 'Other'] as const;
export const inquirySchema = z.object({
  full_name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  work_email: z.string().trim().email('Please enter a valid email address.').max(254),
  company: z.string().trim().min(1, 'Please enter your company.').max(150),
  project_type: z.enum(projectTypes),
  description: z.string().trim().min(20, 'Please tell us a little more (at least 20 characters).').max(5000),
});
export type Inquiry = z.infer<typeof inquirySchema>;