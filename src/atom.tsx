import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'To Do': [],
    doing: [],
    done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
