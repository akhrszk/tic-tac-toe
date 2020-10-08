import { calculateNextPlayer, calculateWinner } from './game'
import Player from '../domain/player'
import Disk from '../domain/disk';
import { Board } from '../features/board/boardSlice';

const playerA: Player = { disk: Disk.White };
const playerB: Player = { disk: Disk.Black };
const players: [Player, Player] = [playerA, playerB];

const convertDisks = (disks: ("w"|"b"|null)[]): (Disk|null)[] => {
  return disks.map(v => v === null ? null : v === "w" ? Disk.White : Disk.Black);
};

const initialBoard: ("w"|"b"|null)[] = [
  null, null, null,
  null, null, null,
  null, null, null
];

const whiteWonBoard: ("w"|"b"|null)[] = [
  "w", "b", "b",
  null, "w", "b",
  null, null, "w"
];

const drawBoard: ("w"|"b"|null)[] = [
  "w", "b", "w",
  "b", "w", "w",
  "b", "w", "b"
];

describe("src/core/game calculateNextPlayer tests", () => {

  it("Next Player when NOT finished game", () => {
    const disks: (Disk|null)[] = convertDisks(initialBoard);
    disks[1] = playerA.disk;
    const board: Board = { disks: disks };
    expect(calculateNextPlayer(playerA, board, players)).toBe(playerB);
  });

  it("Next Player is null when decided game", () => {
    const disks: (Disk|null)[] = convertDisks(whiteWonBoard);
    const board: Board = { disks: disks };
    expect(calculateNextPlayer(playerA, board, players)).toBeNull();
  });

  it("Next Player is null when draw", () => {
    const disks: (Disk|null)[] = convertDisks(drawBoard);
    const board: Board = { disks: disks };
    expect(calculateNextPlayer(playerB, board, players)).toBeNull();
  });
});

describe("src/core/game calculateWinner tests", () => {

  it("Non Winner when NOT finished game", () => {
    const disks: (Disk|null)[] = convertDisks(initialBoard);
    expect(calculateWinner(disks, players)).toBeNull();
  });

  it("Winner when WHITE WON game", () => {
    const disks: (Disk|null)[] = convertDisks(whiteWonBoard);
    expect(calculateWinner(disks, players)).toBe(playerA);
  });

  it("Non Winner when DRAW game", () => {
    const disks: (Disk|null)[] = convertDisks(drawBoard);
    expect(calculateWinner(disks, players)).toBeNull();
  });
});