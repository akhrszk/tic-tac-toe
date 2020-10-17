import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialBoard, Board } from "./board";
import { RootState } from "../../app/store";
import { Move } from "../history/history";
import { canPutMark, putMark as createNewBoard } from "../../core/game";

const initialState = initialBoard();

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    putMark: (state, action: PayloadAction<Move>) => {
      const { player, position } = action.payload;
      if (!canPutMark(state, position)) {
        return;
      }
      state.marks = createNewBoard(state, player.mark, position).marks;
    },
    showBoard: (state, action: PayloadAction<Board>) => {
      state.marks = action.payload.marks;
    }
  }
});

export const { putMark, showBoard } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
