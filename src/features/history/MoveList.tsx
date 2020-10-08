import React from 'react';
import { useSelector } from 'react-redux';
import { selectHistory } from './historySlice';
import { Board } from '../board/board';
import { Move } from './history';

const MoveList: React.FC = () => {
  const history = useSelector(selectHistory);

  const renderStart = () => (
    <li key={0}>
      <button>Go to game start</button>
    </li>
  );

  const renderMove = (step: number, move: Move, board: Board) => (
    <li key={step}>
      <button>
        {`Go to move #${step}`}
      </button>
    </li>
  );

  return (
    <ol>
      {renderStart()}
      {history.map((v, i) => renderMove(i + 1, v.move, v.board))}
    </ol>
  );
};

export default MoveList;
