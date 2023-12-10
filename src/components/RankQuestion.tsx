'use client';
import { answerQuestion } from '@/actions';
import { Box, Paper, Typography } from '@mui/material';
import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export type TRankQuestion = {
  questionVariant: any;
};

export function RankQuestion({ questionVariant }: TRankQuestion) {
  const [answer, setAnswer] = useState<string[]>(questionVariant.variants);
  const debouncedAnswer = useDebounce(answer, 500);

  useEffect(() => {
    if (
      !answer.every(
        (variant, index) => questionVariant.answer[index] === variant,
      )
    ) {
      answerQuestion({ question: questionVariant.id, answer: debouncedAnswer });
    }
  }, [debouncedAnswer, questionVariant]);

  return (
    <Box>
      <Typography>{questionVariant.question.text}</Typography>
      <Box
        component={Reorder.Group}
        axis="x"
        values={answer}
        onReorder={setAnswer}
        sx={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          pl: '0',
        }}>
        {answer.map((variant) => (
          <Paper
            component={Reorder.Item}
            key={variant}
            value={variant}
            sx={{ p: '1rem' }}>
            {variant}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
