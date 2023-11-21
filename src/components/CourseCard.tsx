'use client';

import { Card, CardHeader, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export type TCourseCard = {
  id: string;
  name: string;
  image: string;
};

export function CourseCard({ id, name, image }: TCourseCard) {
  return (
    <Card
      sx={{
        maxWidth: '345px',
        userSelect: 'none',
        width: '100%',
        textDecoration: 'none',
      }}
      component={motion(Link)}
      href={`/courses/${id}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      draggable={false}>
      <CardMedia component="div" sx={{ position: 'relative', height: '200px' }}>
        <Image
          loader={({ src }) => `http://localhost:1337/uploads/${src}`}
          src={image}
          alt="qwe"
          fill
        />
      </CardMedia>

      <CardHeader title={name} />
    </Card>
  );
}