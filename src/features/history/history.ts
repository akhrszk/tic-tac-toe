import Player from "../../domain/player";
import { Board } from "../board/board";

export interface History {
  move: Move;
  board: Board;
}

export interface Move {
  readonly player: Player;
  readonly position: number;
}
