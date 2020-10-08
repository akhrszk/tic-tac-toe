import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialBoard, Board } from "./board";
import { RootState } from "../../app/store";
import { Move } from "../history/history";
import { canPutDisk, putDisk as createNewBoard } from "../../core/game";

const initialState = initialBoard();

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    putDisk: (state, action: PayloadAction<Move>) => {
      const { player, position } = action.payload;
      if (!canPutDisk(state, position)) {
        return;
      }
      state.disks = createNewBoard(state, player.disk, position).disks;
    },
    showBoard: (state, action: PayloadAction<Board>) => {
      state.disks = action.payload.disks;
    }
  }
});

export const { putDisk, showBoard } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
