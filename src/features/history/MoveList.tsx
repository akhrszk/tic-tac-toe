import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { selectHistory } from './historySlice';
import { showBoard } from '../board/boardSlice';
import { Board, initialBoard } from '../board/board';
import { Move } from './history';
import { selectFocusedMoveStep, selectMoveStep } from '../status/statusSlice';

import styles from './History.module.css';

const MoveList: React.FC = () => {
  const history = useSelector(selectHistory);
  const focusedMoveStep = useSelector(selectFocusedMoveStep);
  const dispatch = useDispatch();

  const onClick = (step: number, board: Board) => {
    dispatch(showBoard(board));
    dispatch(selectMoveStep(step));
  };

  const renderStart = () => (
    <li key={'#0'} className={styles.list}>
      <button
        className={
          classNames(styles.move, { [styles.selected]: focusedMoveStep === 0 })
        }
        onClick={() => onClick(0, initialBoard())}
      >
        {'Go to game start'}
      </button>
    </li>
  );

  const renderMove = (move: Move, board: Board) => (
    <li key={`#${move.step}`} className={styles.list}>
      <button
        className={
          classNames(styles.move, { [styles.selected]: move.step === focusedMoveStep })
        }
        onClick={() => onClick(move.step, board)}
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
