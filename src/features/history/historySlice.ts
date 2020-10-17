import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { History, Move } from "./history";
import { initialBoard, Board } from "../board/board";
import { canPutMark, putMark } from "../../core/game";

const initialState: History[] = [];

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<Move>) => {
      const move = action.payload;
      let board: Board = state.length ?
        state.slice(-1)[0].board : initialBoard();
      if (!canPutMark(board, move.position)) {
        return;
      }
      board = putMark(board, move.player.mark, move.position);
      state.push({ board, move });
    }
  }
});

export const { addHistory } = historySlice.actions;

export const selectHistory = (state: RootState) => state.history;

export default historySlice.reducer;
