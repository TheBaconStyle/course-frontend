'use client';

import { answerQuestion } from '@/actions';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export type TSingleQuestion = {
  questionVariant: any;
};

export function SingleQuestion({ questionVariant }: TSingleQuestion) {
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

      <RadioGroup onChange={(_, value) => setAnswer(value)} value={answer}>
        {questionVariant.variants.map((item: string) => (
          <FormControlLabel
            key={item}
            control={<Radio />}
            label={item}
            value={item}
          />
        ))}
      </RadioGroup>

      <Box>
        <Button></Button>
        <Button></Button>
      </Box>
    </Box>
  );
}
