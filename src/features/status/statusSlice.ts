import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Player from "../../domain/player";
import Disk from "../../domain/disk";
import { Board } from "../board/boardSlice";
import { calculateNextPlayer, calculateWinner } from "../../core/game";
import { RootState } from "../../app/store";

interface State {
  nextPlayer: Player|null;
  winner: Player|null;
}

export const player1: Player = { disk: Disk.White };
export const player2: Player = { disk: Disk.Black };
const players: [Player, Player] = [player1, player2];

const initialState: State = {
  nextPlayer: player1,
  winner: null
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    nextTurn: (state, action: PayloadAction<Board>) => {
      const board = action.payload;
      const player = state.nextPlayer;
      console.log(`player: ${player?.disk}`);
      if (player) {
        state.nextPlayer =
          calculateNextPlayer(player, board, players);
        state.winner =
          calculateWinner(board, players);
      }
    }
  }
});

export const { nextTurn } = statusSlice.actions;

export const selectNextPlayer = (state: RootState) => state.status.nextPlayer;
export const selectWinner = (state: RootState) => state.status.winner;

export default statusSlice.reducer;
