'use client';

import { useEffect, useState } from 'react';
import { answerQuestion } from '@/actions';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { useDebounce } from 'usehooks-ts';

export type TMultipleQuestion = {
  questionVariant: any;
};

export function MultipleQuestion({ questionVariant }: TMultipleQuestion) {
  const [answer, setAnswer] = useState<string[]>(questionVariant.answer ?? []);
  const debouncedAnswer = useDebounce(answer, 500);

  useEffect(() => {
    const hasAnswer = Array.isArray(questionVariant.answer);
    const eqLength =
      hasAnswer && debouncedAnswer.length === questionVariant.answer.length;
    const eqItems =
      hasAnswer &&
      (questionVariant.answer as string[]).every((variant) =>
        debouncedAnswer.includes(variant),
      );
    if (!eqLength || !eqItems) {
      answerQuestion({ question: questionVariant.id, answer: debouncedAnswer });
    }
  }, [questionVariant, debouncedAnswer]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        my: '1rem',
      }}>
      <Typography>{questionVariant.question.text}</Typography>
      <FormGroup>
        {questionVariant.variants.map((variant: string) => (
          <FormControlLabel
            key={variant}
            control={<Checkbox />}
            label={variant}
            value={variant}
            checked={answer.includes(variant)}
            onChange={(_, checked) => {
              const newAnsw = new Set(answer);
              if (checked) newAnsw.add(variant);
              if (!checked) newAnsw.delete(variant);
              setAnswer(Array.from(newAnsw));
            }}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
