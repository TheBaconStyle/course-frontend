'use client';

import { Card, CardActions, CardHeader, Chip, Link } from '@mui/material';
import { motion } from 'framer-motion';

export type TTaskCard = {
  theme: string;
  // description?: string;
  id: string;
  course: string;
  // img?: string;
  mark?: string;
  aviability?: string;
  timeRestriction?: number;
};

export function TaskCard({
  id,
  theme,
  course,
  aviability,
  mark,
  timeRestriction,
}: TTaskCard) {
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
      href={`/courses/${course}/tasks/${id}`}>
      <CardHeader title={theme} />

      <CardActions
        sx={{
          flexWrap: 'wrap',
          gap: '8px',
          display: 'flex',
          '& *': { ml: '0px !important' },
        }}>
        {mark && <Chip label={`Оценка: ${mark}`} />}
        {aviability && <Chip label={`Доступен до: ${aviability}`} />}
        {timeRestriction && (
          <Chip label={`Ограничение по времени: ${timeRestriction} мин`} />
        )}
      </CardActions>
    </Card>
  );
}
