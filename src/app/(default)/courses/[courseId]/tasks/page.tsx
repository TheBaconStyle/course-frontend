import { TaskCard } from '@/components';
import { TaskFilter } from '@/components/TaskFilter';
import { TPage, TTaskStatus } from '../../../../../types';
import { Box, Container, Typography } from '@mui/material';

export default async function TasksPage({ searchParams, params }: TPage) {
  const status: TTaskStatus = (searchParams.status as TTaskStatus) ?? 'open';
  const courseId = params.courseId as string;
  return (
    <Container>
      <Typography variant="h5">Тесты:</Typography>
      <TaskFilter currentStatus={status} />
      <Box
        sx={{
          mt: '2rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {Array(21)
          .fill(null)
          .map((_, index) => index + 1)
          .map((item) => (
            <TaskCard
              id={`${item}`}
              theme={`Тест ${item}`}
              key={item}
              courseId={courseId}
            />
          ))}
      </Box>
    </Container>
  );
}
