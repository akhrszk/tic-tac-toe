import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Disk from "../../domain/disk";
import Player from "../../domain/player";
import { RootState } from "../../app/store";
import { calculateNextPlayer } from "../../core/game";

export interface Board {
  disks: (Disk|null)[];
}

interface State {
  board: Board;
  nextPlayer: Player|null;
}

const initialBoard: Board = {
  disks: Array<Disk|null>(9).fill(null)
};

export const player1: Player = { disk: Disk.White };
export const player2: Player = { disk: Disk.Black };

const initialState: State = {
  board: initialBoard,
  nextPlayer: player1
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    putDisk: (state, action: PayloadAction<{ player: Player, position: number }>) => {
      const { player, position } = action.payload;
      if (state.board.disks[position]) {
        return;
      }
      state.board.disks[position] = player.disk;
      state.nextPlayer = 
        calculateNextPlayer(player, state.board, [player1, player2]);
    }
  }
});

export const { putDisk } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board.board;
export const selectNextPlayer = (state: RootState) => state.board.nextPlayer;

export default boardSlice.reducer;
