'use client';

import { Card, CardHeader, Link } from '@mui/material';
import { motion } from 'framer-motion';

export type TTaskCard = {
  theme: string;
  id: string;
  course: string;
  mark?: string;
  timeRestriction?: number;
};

export function TaskCard({ id, theme, course }: TTaskCard) {
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
    </Card>
  );
}
