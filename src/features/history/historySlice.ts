import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { History, Move } from "./history";
import { initialBoard, Board } from "../board/board";

const initialState: History[] = [];

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<Move>) => {
      const move = action.payload;
      const board: Board = state.length ?
        { disks: state.slice(-1)[0].board.disks.slice() } : initialBoard();
      if (board.disks[move.position]) {
        return;
      }
      board.disks[move.position] = move.player.disk;
      state.push({ board, move });
    }
  }
});

export const { addHistory } = historySlice.actions;

export const selectHistory = (state: RootState) => state.history;

export default historySlice.reducer;
