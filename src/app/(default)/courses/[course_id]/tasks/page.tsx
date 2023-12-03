import { getCourseTests } from '@/actions';
import { TaskCard } from '@/components';
import { TPage } from '@/types';
import { Box, Container, Typography } from '@mui/material';
import { stringify } from 'qs';

export default async function TasksPage({ params }: TPage) {
  const course_id = params.course_id as string;
  const tests = await getCourseTests(course_id);

  return (
    <Container>
      <Typography variant="h5">Тесты:</Typography>
      <Box
        sx={{
          mt: '2rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
        {tests.map((test: any) => (
          <TaskCard
            id={test.id}
            theme={test.theme}
            key={test.id}
            course={course_id}
          />
        ))}
      </Box>
    </Container>
  );
}
