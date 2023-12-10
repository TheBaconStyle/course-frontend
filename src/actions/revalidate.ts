'use server';

import { revalidateTag } from 'next/cache';

export async function revalidate(tags: string[]) {
  tags.forEach((tag) => revalidateTag(tag));
}
