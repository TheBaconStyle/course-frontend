'use server';
import { AuthConfig } from '@/config';
import { getServerSession } from 'next-auth';

export type startNewAttemptOptions = {
  course_id: string;
  task_id: string;
};

export async function startNewAttempt({ task_id }: startNewAttemptOptions) {
  const userData = await getServerSession(AuthConfig);
  // const
}
