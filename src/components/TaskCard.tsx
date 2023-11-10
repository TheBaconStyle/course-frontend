'use client'

import { Card, CardActions, CardHeader, Chip, Link } from '@mui/material'
import { motion } from 'framer-motion'

export type TTaskCard = {
  title: string
  description?: string
  id: string
  img?: string
}

export function TaskCard({ id, title }: TTaskCard) {
  return (
    <Card
      sx={{
        maxWidth: '345px',
        userSelect: 'none',
        width: '100%',
        textDecoration: 'none',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      draggable={false}
      component={motion(Link)}
      href={`/tasks/${id}`}
    >
      <CardHeader title={title} />

      <CardActions
        sx={{
          flexWrap: 'wrap',
          gap: '8px',
          display: 'flex',
          '& *': { ml: '0px !important' },
        }}
      >
        <Chip label="Оценка: отлично" />
        <Chip label="Доступен до: 12.10.2023 10:00" />
        <Chip label="Ограничение по времени: 15 мин" />
      </CardActions>
    </Card>
  )
}
