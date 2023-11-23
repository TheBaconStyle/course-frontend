'use client';

import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { TAnswer } from '../types';

export type TSingleQuestion = {
  id: string;
  answers: TAnswer[];
  text: string;
};

export function SingleQuestion({ answers, text }: TSingleQuestion) {
  const [answer, setAnswer] = useState<string>('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        my: '1rem',
      }}>
      <Typography>{text}</Typography>

      <RadioGroup onChange={(_, value) => setAnswer(value)} value={answer}>
        {answers.map((item) => (
          <FormControlLabel
            key={item.id}
            control={<Radio />}
            label={item.value}
            value={item.id}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
