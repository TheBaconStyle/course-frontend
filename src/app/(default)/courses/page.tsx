import { getAviableCourses } from '@/actions';
import { CourseCard } from '@/components/CourseCard';
import { TPage } from '@/types';
import { Box, Container, Typography } from '@mui/material';

export default async function TasksPage({ searchParams }: TPage) {
  const courses = await getAviableCourses();

  return (
    <Container>
      <Typography variant="h5">Курсы:</Typography>
      <Box
        sx={{
          mt: '2rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
        {courses.map((course: any) => (
          <CourseCard
            id={`${course.id}`}
            name={course.name}
            key={course.id}
            image={course.image}
          />
        ))}
      </Box>
    </Container>
  );
}
