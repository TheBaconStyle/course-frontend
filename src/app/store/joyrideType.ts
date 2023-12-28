// import { createStore } from '@/functions';
import { create } from 'zustand';

export const useJoyrideType = create(
  (set) => ({
    type: 'courses',
    setPage: (pathname: string) => {
      set('qwe');
    },
  }),
  // { name: 'joyrideType' },
);
