import Player from '../domain/player';
import { Board } from '../features/board/board';
import Mark from '../domain/mark';

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

export const canPutMark = (board: Board, position: number): boolean => !board.marks[position]

export const putMark = (board: Board, mark: Mark, position: number): Board => {
  if (!canPutMark(board, position)) {
    throw Error('can\'t put Mark on this position.');
  }
  const marks = board.marks.slice();
  marks[position] = mark;
  return { marks };
};

export const calculateNextPlayer = (currentPlayer: Player, board: Board, players: [Player, Player]): Player|null => {
  const [playerA, playerB] = players;
  if (calculateWinner(board, players)) {
    return null;
  }
  if (!board.marks.includes(null)) {
    return null;
  }
  return currentPlayer === playerA ? playerB : playerA;
};

export const calculateWinner = (board: Board, players: [Player, Player]): Player|null => {
  const { marks } = board;
  const [playerA, playerB] = players;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
      return marks[a] === playerA.mark ? playerA : playerB;
    }
  }
  return null;
};
