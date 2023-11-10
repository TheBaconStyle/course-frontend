'use client';

import { TTaskStatus } from '@/types';
import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/navigation';

type TTaskFilter = {
  currentStatus: TTaskStatus;
};

export function TaskFilter({ currentStatus }: TTaskFilter) {
  const router = useRouter();
  return (
    <Tabs
      value={currentStatus}
      onChange={(_, value) => router.push(`?status=${value}`)}>
      <Tab value="open" label="Открытые" />
      <Tab value="closed" label="Завершённые" />
    </Tabs>
  );
}
