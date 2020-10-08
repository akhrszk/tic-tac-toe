import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHistory } from './historySlice';
import { showBoard } from '../board/boardSlice';
import { Board, initialBoard } from '../board/board';
import { Move } from './history';
import { selectFocusedMoveStep, selectMoveStep } from '../status/statusSlice';

const MoveList: React.FC = () => {
  const history = useSelector(selectHistory);
  const focusedMoveStep = useSelector(selectFocusedMoveStep);
  const dispatch = useDispatch();

  const onClick = (step: number, board: Board) => {
    dispatch(showBoard(board));
    dispatch(selectMoveStep(step));
  };

  const renderStart = () => (
    <li key={'#0'}>
      <button
        onClick={() => onClick(0, initialBoard())}
        disabled={focusedMoveStep === 0}
      >
        {'Go to game start'}
      </button>
    </li>
  );

  const renderMove = (move: Move, board: Board) => (
    <li key={`#${move.step}`}>
      <button
        onClick={() => onClick(move.step, board)}
        disabled={move.step === focusedMoveStep}
      >
        {`Go to move #${move.step}`}
      </button>
    </li>
  );

  return (
    <ol>
      {renderStart()}
      {history.map(v => renderMove(v.move, v.board))}
    </ol>
  );
};

export default MoveList;
