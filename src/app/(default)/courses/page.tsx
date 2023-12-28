import { getApiData } from '@/actions';
import { CourseCard } from '@/components/CourseCard';
import { AuthConfig } from '@/config';
import { TPage } from '@/types';
import { Box, Container, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';

export default async function TasksPage({ searchParams }: TPage) {
  const userData = await getServerSession(AuthConfig);
  const { data: courses } = await getApiData({
    path: 'api/courses',
    query: {
      filters: {
        $or: [
          { groups: { students: { account: { id: userData?.user.id } } } },
          { teacher: { account: { id: userData?.user.id } } },
        ],
      },
      populate: 'image',
    },
    options: { next: { revalidate: 5 } },
  });

  return (
    <Container id="courses">
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
