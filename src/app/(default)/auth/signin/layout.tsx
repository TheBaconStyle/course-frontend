import { TPage } from '../../../../types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function PageLayout({ children }: PropsWithChildren) {
  const data = await getServerSession();

  if (data?.user) {
    return redirect('/profile');
  }

  return <>{children}</>;
}
