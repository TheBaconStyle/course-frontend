'use client';

import { revalidate, startNewAttempt } from '@/actions';
import { Box, Button, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

export type TAttemptStarter = {
  task: string;
  attempts_remaining: number;
};

export function AttemptStarter({ task, attempts_remaining }: TAttemptStarter) {
  const router = useRouter();
  const params = useParams();
  const course_id = params.course_id;
  const task_id = params.task_id;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        my: '1rem',
      }}>
      <Typography>
        Доступно прохождение теста (Осталось попыток: {attempts_remaining})
      </Typography>
      <Button
        variant="contained"
        disabled={attempts_remaining === 0}
        onClick={async () => {
          const { attempt, error, message } = await startNewAttempt({
            task_id: task,
          });
          await revalidate(['test_aviability_attempts']);
          enqueueSnackbar({
            variant: !error && attempt ? 'success' : 'error',
            message: <Typography>{message}</Typography>,
          });
          router.push(`/attempt/${attempt.id}`);
        }}>
        Начать попытку
      </Button>
    </Box>
  );
}
