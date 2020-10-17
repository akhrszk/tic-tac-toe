import React from 'react';
import styles from './Board.module.css';
import Mark from '../../domain/mark';

const Cell: React.FC<{ i: number, mark: Mark|null, onClick: (i: number) => void }> = ({
  i,
  mark = null,
  onClick
}) => (
  <button
    className={styles.cell}
    onClick={() => onClick(i)}
  >
    {mark}
  </button>
);

export default Cell;
