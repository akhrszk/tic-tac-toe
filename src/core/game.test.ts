import {
  calculateNextPlayer,
  calculateWinner,
  canPutMark,
  putMark,
} from './game';
import Player from '../domain/player';
import { Board } from '../features/board/board';
import Mark from '../domain/mark';

const playerA: Player = { mark: Mark.Circle };
const playerB: Player = { mark: Mark.Cross };
const players: [Player, Player] = [playerA, playerB];

const convertMarks = (marks: ("o"|"x"|null)[]): (Mark|null)[] => {
  return marks.map(v => v === null ? null : v === "o" ? Mark.Circle : Mark.Cross);
};

const initialBoard: ("o"|"x"|null)[] = [
  null, null, null,
  null, null, null,
  null, null, null
];

const whiteWonBoard: ("o"|"x"|null)[] = [
  "o", "x", "x",
  null, "o", "x",
  null, null, "o"
];

const drawBoard: ("o"|"x"|null)[] = [
  "o", "x", "o",
  "x", "o", "o",
  "x", "o", "x"
];

describe("src/core/game canPutMark tests", () => {

  it("CAN put Mark on empty position", () => {
    const marks: (Mark|null)[] = convertMarks(initialBoard);
    const board: Board = { marks };
    expect(canPutMark(board, 1)).toBeTruthy();
  });

  it("CANNOT put Mark on position where a mark already exists", () => {
    const marks: (Mark|null)[] = convertMarks(initialBoard);
    marks[1] = Mark.Circle;
    const board: Board = { marks };
    expect(canPutMark(board, 1)).toBeFalsy();
  });
});

describe("src/core/game putMark tests", () => {

  it("Check put Mark Success", () => {
    const marks: (Mark|null)[] = convertMarks(initialBoard);
    const board: Board = { marks };
    expect(putMark(board, Mark.Circle, 1).marks[1]).toBe(Mark.Circle);
  });

  it("Check put Mark Failed", () => {
    const marks: (Mark|null)[] = convertMarks(initialBoard);
    marks[1] = Mark.Circle;
    const board: Board = { marks };
    expect(() => { putMark(board, Mark.Cross, 1) }).toThrow();
  });
});

describe("src/core/game calculateNextPlayer tests", () => {

  it("Next Player when NOT finished game", () => {
    const marks: (Mark|null)[] = convertMarks(initialBoard);
    marks[1] = playerA.mark;
    const board: Board = { marks };
    expect(calculateNextPlayer(playerA, board, players)).toBe(playerB);
  });

  it("Next Player is null when decided game", () => {
    const marks: (Mark|null)[] = convertMarks(whiteWonBoard);
    const board: Board = { marks };
    expect(calculateNextPlayer(playerA, board, players)).toBeNull();
  });

  it("Next Player is null when draw", () => {
    const marks: (Mark|null)[] = convertMarks(drawBoard);
    const board: Board = { marks };
    expect(calculateNextPlayer(playerB, board, players)).toBeNull();
  });
});

describe("src/core/game calculateWinner tests", () => {

  it("Non Winner when NOT finished game", () => {
    const marks: (Mark|null)[] = convertMarks(initialBoard);
    const board: Board = { marks };
    expect(calculateWinner(board, players)).toBeNull();
  });

  it("Winner when WHITE WON game", () => {
    const marks: (Mark|null)[] = convertMarks(whiteWonBoard);
    const board: Board = { marks };
    expect(calculateWinner(board, players)).toBe(playerA);
  });

  it("Non Winner when DRAW game", () => {
    const marks: (Mark|null)[] = convertMarks(drawBoard);
    const board: Board = { marks };
    expect(calculateWinner(board, players)).toBeNull();
  });
});
