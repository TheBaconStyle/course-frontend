import { headers } from 'next/headers';
export async function getServerPathname() {
  const reqHeaders = headers();
  return reqHeaders.get('x-pathname');
}
