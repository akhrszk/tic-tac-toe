import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Player from "../../domain/player";
import Disk from "../../domain/disk";
import { calculateNextPlayer, calculateWinner } from "../../core/game";
import { RootState } from "../../app/store";
import { Move } from "../history/history";
import { Board } from "../board/board";

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
    nextTurn: (state, action: PayloadAction<{ board: Board, move: Move }>) => {
      const { board, move } = action.payload;
      state.nextPlayer = calculateNextPlayer(move.player, board, players);
      state.winner = calculateWinner(board, players);
    }
  }
});

export const { nextTurn } = statusSlice.actions;

export const selectNextPlayer = (state: RootState) => state.status.nextPlayer;
export const selectWinner = (state: RootState) => state.status.winner;

export default statusSlice.reducer;
