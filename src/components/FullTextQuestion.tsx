'use client';

import { answerQuestion } from '@/actions/answerQuestion';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export type TFullTextQuestion = {
  questionVariant: any;
};

export function FullTextQuestion({ questionVariant }: TFullTextQuestion) {
  const [answer, setAnswer] = useState<string>(questionVariant.answer);
  const debouncedAnswer = useDebounce(answer, 500);

  useEffect(() => {
    if (questionVariant.answer !== debouncedAnswer) {
      answerQuestion({ question: questionVariant.id, answer: debouncedAnswer });
    }
  }, [debouncedAnswer, questionVariant]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
      <Typography>{questionVariant.question.text}</Typography>

      <TextField
        label="Ответ"
        onChange={({ target: { value } }) => setAnswer(value)}
        value={answer}
        variant="filled"
      />

      <Box>
        <Button></Button>
        <Button></Button>
      </Box>
    </Box>
  );
}
