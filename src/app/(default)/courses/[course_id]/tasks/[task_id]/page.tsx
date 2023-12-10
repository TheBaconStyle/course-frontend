import { getApiData, getTestAviability } from '@/actions';
import { AttemptStarter } from '@/components/AttemptStarter';
import { TPage } from '@/types';
import {
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { notFound } from 'next/navigation';

export default async function TaskPage({ params }: TPage) {
  const { task_id } = params;
  const {
    data: { 0: task },
  } = await getApiData({
    path: 'api/tests',
    query: {
      filters: { id: task_id },
    },
    options: { next: { tags: ['current_test'] } },
  });

  if (!task) {
    notFound();
  }

  const { aviable, attempts, session } = await getTestAviability(task_id);

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: '1rem' }}>
        Тест по теме: {task.theme}
      </Typography>
      <Divider />
      <TableContainer component={Paper} sx={{ my: '1rem' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Количество вопросов</TableCell>
              <TableCell>
                {aviable ? session.question_count : task.question_count}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Время на выполнение</TableCell>
              <TableCell>
                {aviable ? session.complete_time : task.complete_time} мин
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Количество попыток</TableCell>
              <TableCell>
                {aviable ? session.attempt_count : task.attempt_count}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Удовлетворительно</TableCell>
              <TableCell>
                {aviable ? session.pass : task.pass} правильных
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Хорошо</TableCell>
              <TableCell>
                {aviable ? session.good : task.good} правильных
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Отлично</TableCell>
              <TableCell>
                {aviable ? session.excellent : task.excellent} правильных
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />

      {aviable && (
        <>
          <AttemptStarter
            task={task_id}
            attempts_remaining={session.attempt_count - attempts.length}
          />
          <Divider />
        </>
      )}
    </Container>
  );
}
