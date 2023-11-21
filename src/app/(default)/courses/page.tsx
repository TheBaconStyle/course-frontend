import { CourseCard } from '@/components/CourseCard';
import { TPage, TTaskStatus } from '@/types';
import { Box, Container, Typography } from '@mui/material';

export default async function TasksPage({ searchParams }: TPage) {
  const status: TTaskStatus = (searchParams.status as TTaskStatus) ?? 'open';

  return (
    <Container>
      <Typography variant="h5">Курсы:</Typography>
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
          .map((_, index) => {
            const item = index + 1;
            return (
              <CourseCard
                id={`${item}`}
                name={`Курс ${item}`}
                key={item}
                image="1547244783_61366295_1200x832_ece6176947.jpeg"
              />
            );
          })}
      </Box>
    </Container>
  );
}
