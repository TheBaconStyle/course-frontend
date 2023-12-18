'use client';

import { completeAttempt } from '@/actions/completeAttempt';
import { Button } from '@mui/material';

export type TCompleteAttemptButton = {
  attempt: string;
};

export function CompleteAttemptButton({ attempt }: TCompleteAttemptButton) {
  return (
    <Button onClick={() => completeAttempt({ attempt })}>
      Закончить попытку
    </Button>
  );
}
