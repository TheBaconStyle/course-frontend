// import { createStore } from '@/functions';
import { create } from 'zustand';

export const useJoyrideRun = create<{
  run: boolean;
  restart: () => void;
  start: () => void;
  finish: () => void;
}>((set) => ({
  run: false,
  restart: () => {
    set({ run: false });
    setTimeout(() => {
      set({ run: true });
    }, 1);
  },
  start: () => set({ run: true }),
  finish: () => set({ run: false }),
}));
