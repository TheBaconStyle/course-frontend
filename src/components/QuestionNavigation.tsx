'use client';

import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export type TQuestionNavigation = {
  questions_count: number;
  onNavigate: () => void;
};

export function QuestionNavigation({
  onNavigate,
  questions_count,
}: TQuestionNavigation) {
  const searchParams = useSearchParams();
  const currentQuestionIndex = Number(searchParams.get('question') ?? 1);
  return (
    <Box>
      <Button
        LinkComponent={Link}
        href={`?question=${currentQuestionIndex - 1}`}
        disabled={currentQuestionIndex === 1}
        onClick={onNavigate}>
        Предыдущий вопрос
      </Button>
      <Button
        LinkComponent={Link}
        href={`?question=${currentQuestionIndex + 1}`}
        disabled={currentQuestionIndex === questions_count}
        onClick={onNavigate}>
        Следующий вопрос
      </Button>
    </Box>
  );
}
