import { TPage } from '@/types';
import { Container } from '@mui/material';

export default async function AttemptPage({ params }: TPage) {
  const { attempt_id } = params;
  return <Container>{attempt_id}</Container>;
}
