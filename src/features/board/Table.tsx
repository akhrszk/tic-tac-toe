import React, { useEffect } from 'react';
import Cell from './Cell';
import styles from './Board.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectBoard, putDisk } from './boardSlice';
import { nextTurn, selectNextPlayer } from '../status/statusSlice';
import { addHistory } from '../history/historySlice';

const Table: React.FC = () => {
  const board = useSelector(selectBoard);
  const nextPlayer = useSelector(selectNextPlayer);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(nextTurn(board));
  }, [board, dispatch]);

  const renderCell = (i: number) => (
    <Cell
      i={i}
      disk={board.disks[i]}
      onClick={i => {
        if (nextPlayer) {
          dispatch(putDisk({ player: nextPlayer, position: i}));
          dispatch(addHistory({ player: nextPlayer, position: i}));
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
