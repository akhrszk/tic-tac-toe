import Player from '../domain/player';
import { Board } from '../features/board/board';
import Disk from '../domain/disk';

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const canPutDisk = (board: Board, position: number): boolean => !board.disks[position]

export const putDisk = (board: Board, disk: Disk, position: number): Board => {
  if (!canPutDisk(board, position)) {
    throw Error('can\'t put DISK on this position.');
  }
  const disks = board.disks.slice();
  disks[position] = disk;
  return { disks };
};

export const calculateNextPlayer = (currentPlayer: Player, board: Board, players: [Player, Player]): Player|null => {
  const [playerA, playerB] = players;
  if (calculateWinner(board, players)) {
    return null;
  }
  if (!board.disks.includes(null)) {
    return null;
  }
  return currentPlayer === playerA ? playerB : playerA;
};

export const calculateWinner = (board: Board, players: [Player, Player]): Player|null => {
  const { disks } = board;
  const [playerA, playerB] = players;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (disks[a] && disks[a] === disks[b] && disks[a] === disks[c]) {
      return disks[a] === playerA.disk ? playerA : playerB;
    }
  }
  return null;
};
