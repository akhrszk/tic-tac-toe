import React from 'react';
import { useSelector } from 'react-redux';
import { selectNextPlayer, selectWinner } from './statusSlice';

import styles from './Status.module.css';

const Status: React.FC = () => {
  const nextPlayer = useSelector(selectNextPlayer);
  const winner = useSelector(selectWinner);

  if (nextPlayer) {
    return (<div className={styles.status}>Next: {nextPlayer.mark}</div>);
  } else if (winner) {
    return (<div className={styles.status}>{winner.mark} won</div>);
  } else {
    return (<div className={styles.status}>Draw game.</div>);
  }
};

export default Status;