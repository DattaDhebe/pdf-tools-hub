import { permanentRedirect } from 'next/navigation';
import { emailTemplateEditorPath } from '@/lib/email-template-page';

export default function LegacyEmailStudioPage() {
  permanentRedirect(emailTemplateEditorPath);
}
