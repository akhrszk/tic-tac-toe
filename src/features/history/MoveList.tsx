import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHistory } from './historySlice';
import { showBoard } from '../board/boardSlice';
import { Board, initialBoard } from '../board/board';
import { Move } from './history';

const MoveList: React.FC = () => {
  const history = useSelector(selectHistory);
  const dispatch = useDispatch();

  const renderStart = () => (
    <li key={0}>
      <button
        onClick={() => dispatch(showBoard(initialBoard()))}
      >
        {'Go to game start'}
      </button>
    </li>
  );

  const renderMove = (step: number, move: Move, board: Board) => (
    <li key={step}>
      <button
        onClick={() => dispatch(showBoard(board))}
      >
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
