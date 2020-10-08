import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import statusReducer from '../features/status/statusSlice';
import historyReducer from '../features/history/historySlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    status: statusReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
