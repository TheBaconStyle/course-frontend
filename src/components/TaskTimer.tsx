'use client';

import { Typography } from '@mui/material';
import { differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export type TTaskTimer = {
  from: Date;
  to: Date;
};

export function TaskTimer({ from, to }: TTaskTimer) {
  const router = useRouter();
  const [currentMoment, setCurrentMoment] = useState<Date>(
    () => new Date(from),
  );
  const finishMoment = new Date(to);

  const seconds = differenceInSeconds(finishMoment, currentMoment) % 60;
  const minutes = differenceInMinutes(finishMoment, currentMoment);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoment(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  useEffect(() => {
    if (seconds < 0 || minutes < 0) {
      router.refresh();
    }
  }, [seconds, minutes, router]);

  return (
    <Typography>
      Оставшееся время:
      {minutes.toFixed(0).padStart(2, '0')}:
      {seconds.toFixed(0).padStart(2, '0')}
    </Typography>
  );
}
