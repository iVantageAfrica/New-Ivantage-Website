import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { inquirySchema } from './inquiry-schema';

export const submitInquiry = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) throw new Error('Inquiries are temporarily unavailable. Please try again later.');
    const client = createClient(url, key, {
      auth: { persistSession: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { error } = await client.from('project_inquiries').insert(data);
    if (error) { console.error('Inquiry storage failed', error.code); throw new Error('Your inquiry could not be saved. Please try again.'); }
    return { saved: true };
  });