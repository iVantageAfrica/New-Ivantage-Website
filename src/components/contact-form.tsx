import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { inquirySchema, projectTypes } from '@/lib/inquiry-schema';
import { submitInquiry } from '@/lib/inquiry.functions';

export function ContactForm() {
  const submit = useServerFn(submitInquiry);
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = inquirySchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Please check your details.'); return; }
    setPending(true); setError('');
    try { const result = await submit({ data: parsed.data }); if (result.saved) { setSaved(true); form.reset(); } }
    catch (err) { setError(err instanceof Error ? err.message : 'Your inquiry could not be saved. Please try again.'); }
    finally { setPending(false); }
  }
  if (saved) return <div className="contact-success" role="status"><CheckCircle2 size={36}/><h3>Your conversation starts here.</h3><p>Your inquiry has been saved for the iVantage team.</p><Button variant="outline" onClick={() => setSaved(false)}>Send another inquiry <ArrowUpRight/></Button></div>;
  return <form className="contact-form" onSubmit={onSubmit}>
    <div className="form-pair"><label>Full name<input name="full_name" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={100}/></label><label>Work email<input name="work_email" autoComplete="email" type="email" placeholder="you@company.com" required maxLength={254}/></label></div>
    <div className="form-pair"><label>Company<input name="company" autoComplete="organization" placeholder="Your company" required maxLength={150}/></label><label>Project type<select name="project_type" required defaultValue=""><option value="" disabled>Select a project type</option>{projectTypes.map(type => <option key={type}>{type}</option>)}</select></label></div>
    <label>Tell us about your project<textarea name="description" placeholder="What would you like to build?" required minLength={20} maxLength={5000} rows={4}/></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <Button variant="brand" size="lg" disabled={pending} type="submit">{pending ? <>Saving your inquiry <Loader2 className="animate-spin"/></> : <>Start a Conversation <ArrowUpRight/></>}</Button>
  </form>;
}