import { create } from 'zustand';
import { StateCreator } from 'zustand';
import { PersistOptions, devtools, persist } from 'zustand/middleware';

export function createStore<T = any>(
  store: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    []
  >,
  options: PersistOptions<T, T>,
) {
  return create<T>()(devtools(persist(store, options)));
}
