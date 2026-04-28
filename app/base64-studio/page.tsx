import { permanentRedirect } from 'next/navigation';

export default function LegacyBase64StudioPage() {
  permanentRedirect('/base64-converter');
}
