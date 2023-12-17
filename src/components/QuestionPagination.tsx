'use client';

import { Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';

export type TQuestionPagination = {
  current_question: number;
  question_count: number;
};

export function QuestionPagination({
  question_count,
  current_question,
}: TQuestionPagination) {
  const router = useRouter();
  return (
    <Pagination
      count={question_count}
      page={current_question}
      onChange={(_, p) => {
        router.push(`?question=${p}`);
      }}
    />
  );
}
