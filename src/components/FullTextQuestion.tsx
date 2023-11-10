'use client'

import { Box, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export type TFullTextQuestion = {
  text: string
  id: string
}

export function FullTextQuestion({ id, text }: TFullTextQuestion) {
  const [answer, setAnswer] = useState<string>('')

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

      <TextField
        label="Ответ"
        onChange={({ target: { value } }) => setAnswer(value)}
        value={answer}
        variant="filled"
      />
    </Box>
  )
}
