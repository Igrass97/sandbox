import { create } from 'zustand';
import { Ticket } from '../../../types';

export const useDraggerData = create<{
  data: Ticket | null;
  setDragData: (t?: Ticket) => unknown;
}>(set => ({
  data: null,
  setDragData: (newDragData?: Ticket) => set({ data: newDragData }),
}));
