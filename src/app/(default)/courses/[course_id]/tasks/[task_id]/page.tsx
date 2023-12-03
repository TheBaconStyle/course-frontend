import { getTestAviability, getTestByID } from '@/actions';
import { TPage } from '@/types';
import {
  Box,
  Button,
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
  const task = await getTestByID(task_id);
  console.log(task);
  if (!task) {
    notFound();
  }

  const isTestAviable = await getTestAviability(task_id);

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
              <TableCell>{task.question_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Время на выполнение</TableCell>
              <TableCell>{task.complete_time} мин</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Количество попыток</TableCell>
              <TableCell>{task.attempt_count}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Удовлетворительно</TableCell>
              <TableCell>{task.pass} правильных</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Хорошо</TableCell>
              <TableCell>{task.good} правильных</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Отлично</TableCell>
              <TableCell>{task.excellent} правильных</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />

      {isTestAviable && (
        <>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              my: '1rem',
            }}>
            <Typography>Доступно прохождение теста</Typography>
            <Button variant="contained">Начать попытку</Button>
          </Box>
          <Divider />
        </>
      )}
    </Container>
  );
}
