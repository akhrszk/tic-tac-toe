import React from 'react';
import Disk from '../../domain/disk';
import styles from './Board.module.css';

const Cell: React.FC<{ i: number, disk: Disk|null, onClick: (i: number) => void }> = ({
  i,
  disk = null,
  onClick
}) => (
  <button
    className={styles.cell}
    onClick={() => onClick(i)}
  >
    {disk}
  </button>
);

export default Cell;
