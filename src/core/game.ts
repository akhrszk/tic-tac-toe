import Disk from '../domain/disk';
import Player from '../domain/player';
import { Board } from '../features/board/boardSlice';

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

export const calculateNextPlayer = (currentPlayer: Player, board: Board, players: [Player, Player]): Player|null => {
  const [playerA, playerB] = players;
  if (calculateWinner(board.disks, players)) {
    return null;
  }
  if (!board.disks.includes(null)) {
    return null;
  }
  return currentPlayer === playerA ? playerB : playerA;
};

export const calculateWinner = (disks: (Disk|null)[], players: [Player, Player]): Player|null => {
  const [playerA, playerB] = players;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (disks[a] && disks[a] === disks[b] && disks[a] === disks[c]) {
      return disks[a] === playerA.disk ? playerA : playerB;
    }
  }
  return null;
};