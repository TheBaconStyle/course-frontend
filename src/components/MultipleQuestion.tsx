'use client'

import { useState } from 'react'
import { TAnswer } from '../types'
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'

export type TMultipleQuestion = {
  id: string
  text: string
  answers: TAnswer[]
}

export function MultipleQuestion({ id, text, answers }: TMultipleQuestion) {
  const [answer, setAnswer] = useState<string[]>([])
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        my: '1rem',
      }}
    >
      <Typography>{text}</Typography>

      <FormGroup>
        {answers.map((item) => (
          <FormControlLabel
            key={item.id}
            control={<Checkbox />}
            label={item.value}
            value={item.id}
            checked={answer.includes(item.id)}
            onChange={(_, checked) => {
              const newAnsw = new Set(answer)
              if (checked) newAnsw.add(item.id)
              if (!checked) newAnsw.delete(item.id)
              setAnswer(Array.from(newAnsw))
            }}
          />
        ))}
      </FormGroup>
    </Box>
  )
}
