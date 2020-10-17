import React, { useEffect } from 'react';
import Cell from './Cell';
import { useSelector, useDispatch } from 'react-redux';
import { selectBoard, putMark } from './boardSlice';
import { nextTurn, selectNextPlayer, selectMoveStep, selectFocusedMoveStep } from '../status/statusSlice';
import { addHistory, selectHistory } from '../history/historySlice';
import Player from '../../domain/player';
import { Move } from '../history/history';

import styles from './Board.module.css';

const Table: React.FC = () => {
  const board = useSelector(selectBoard);
  const nextPlayer = useSelector(selectNextPlayer);
  const history = useSelector(selectHistory);
  const focusedMoveStep = useSelector(selectFocusedMoveStep);
  const dispatch = useDispatch();

  useEffect(() => {
    if (history.length) {
      const { board, move } = history.slice(-1)[0];
      dispatch(nextTurn({ board, move }));
      dispatch(selectMoveStep(move.step));
    }
  }, [history, dispatch]);

  const createMove: (player: Player, position: number) => Move =
    (player, position) => {
      if (!history.length) {
        return { step: 1, player, position };
      }
      const { step } = history.slice(-1)[0].move;
      return { step: step + 1, player, position };
    };

  const renderCell = (i: number) => (
    <Cell
      i={i}
      mark={board.marks[i]}
      onClick={i => {
        const move = history.length ? history.slice(-1)[0].move : null;
        if (nextPlayer && (move?.step || 0) === focusedMoveStep) {
          const move = createMove(nextPlayer, i);
          dispatch(putMark(move));
          dispatch(addHistory(move));
        }
      }}
    />
  );

  return (
    <div>
      <div className={styles.row}>
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </div>
      <div className={styles.row}>
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </div>
      <div className={styles.row}>
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
    </div>
  );
};

export default Table;
