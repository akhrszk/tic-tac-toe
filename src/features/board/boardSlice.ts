import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialBoard } from "./board";
import { RootState } from "../../app/store";
import { Move } from "../history/history";

const initialState = initialBoard();

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    putDisk: (state, action: PayloadAction<Move>) => {
      const { player, position } = action.payload;
      if (state.disks[position]) {
        return;
      }
      state.disks[position] = player.disk;
    }
  }
});

export const { putDisk } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
