import {
  calculateNextPlayer,
  calculateWinner,
  canPutDisk,
  putDisk 
} from './game';
import Player from '../domain/player';
import Disk from '../domain/disk';
import { Board } from '../features/board/board';

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

describe("src/core/game canPutDisk tests", () => {

  it("CAN put Disk on empty position", () => {
    const disks: (Disk|null)[] = convertDisks(initialBoard);
    const board: Board = { disks };
    expect(canPutDisk(board, 1)).toBeTruthy();
  });

  it("CANNOT put Disk on position where a disk already exists", () => {
    const disks: (Disk|null)[] = convertDisks(initialBoard);
    disks[1] = Disk.White;
    const board: Board = { disks };
    expect(canPutDisk(board, 1)).toBeFalsy();
  });
});

describe("src/core/game putDisk tests", () => {

  it("Check put Disk Success", () => {
    const disks: (Disk|null)[] = convertDisks(initialBoard);
    const board: Board = { disks };
    expect(putDisk(board, Disk.White, 1).disks[1]).toBe(Disk.White);
  });

  it("Check put Disk Failed", () => {
    const disks: (Disk|null)[] = convertDisks(initialBoard);
    disks[1] = Disk.White;
    const board: Board = { disks };
    expect(() => { putDisk(board, Disk.Black, 1) }).toThrow();
  });
});

describe("src/core/game calculateNextPlayer tests", () => {

  it("Next Player when NOT finished game", () => {
    const disks: (Disk|null)[] = convertDisks(initialBoard);
    disks[1] = playerA.disk;
    const board: Board = { disks };
    expect(calculateNextPlayer(playerA, board, players)).toBe(playerB);
  });

  it("Next Player is null when decided game", () => {
    const disks: (Disk|null)[] = convertDisks(whiteWonBoard);
    const board: Board = { disks };
    expect(calculateNextPlayer(playerA, board, players)).toBeNull();
  });

  it("Next Player is null when draw", () => {
    const disks: (Disk|null)[] = convertDisks(drawBoard);
    const board: Board = { disks };
    expect(calculateNextPlayer(playerB, board, players)).toBeNull();
  });
});

describe("src/core/game calculateWinner tests", () => {

  it("Non Winner when NOT finished game", () => {
    const disks: (Disk|null)[] = convertDisks(initialBoard);
    const board: Board = { disks };
    expect(calculateWinner(board, players)).toBeNull();
  });

  it("Winner when WHITE WON game", () => {
    const disks: (Disk|null)[] = convertDisks(whiteWonBoard);
    const board: Board = { disks };
    expect(calculateWinner(board, players)).toBe(playerA);
  });

  it("Non Winner when DRAW game", () => {
    const disks: (Disk|null)[] = convertDisks(drawBoard);
    const board: Board = { disks };
    expect(calculateWinner(board, players)).toBeNull();
  });
});
