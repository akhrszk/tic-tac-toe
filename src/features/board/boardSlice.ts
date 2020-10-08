import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Disk from "../../domain/disk";
import Player from "../../domain/player";
import { RootState } from "../../app/store";

export interface Board {
  disks: (Disk|null)[];
}

const initialBoard: Board = {
  disks: Array<Disk|null>(9).fill(null)
};

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoard,
  reducers: {
    putDisk: (state, action: PayloadAction<{ player: Player, position: number }>) => {
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
