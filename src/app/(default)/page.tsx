import { SignInForm } from '@/components';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const data = await getServerSession();
  if (data) redirect('/courses');
  return <SignInForm />;
}
