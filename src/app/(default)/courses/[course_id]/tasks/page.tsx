import { getApiData } from '@/actions';
import { TaskCard } from '@/components';
import { TPage } from '@/types';
import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowLeft } from '@mui/icons-material';
import Link from 'next/link';

export default async function TasksPage({ params }: TPage) {
  const course_id = params.course_id as string;
  const { data: tests } = await getApiData({
    path: 'api/tests',
    query: {
      filters: { course: { id: course_id } },
      fields: ['id', 'theme'],
    },
  });

  return (
    <Container>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button LinkComponent={Link} href={`/courses`}>
          <ArrowLeft /> Назад к курсам
        </Button>
        <Typography variant="h5">Тесты:</Typography>
      </Box>
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
