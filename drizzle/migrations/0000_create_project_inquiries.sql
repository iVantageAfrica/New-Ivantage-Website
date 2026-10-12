CREATE TABLE public.project_inquiries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 full_name text NOT NULL,
 work_email text NOT NULL,
 company text NOT NULL,
 project_type text NOT NULL,
 description text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.project_inquiries TO anon;
GRANT ALL ON public.project_inquiries TO service_role;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit inquiries" ON public.project_inquiries FOR INSERT TO anon WITH CHECK (char_length(full_name) BETWEEN 2 AND 100 AND char_length(work_email) BETWEEN 3 AND 254 AND char_length(company) BETWEEN 1 AND 150 AND project_type IN ('Web application','Mobile application','Enterprise software','UI/UX and product engineering','Other') AND char_length(description) BETWEEN 20 AND 5000);