import React from 'react';
import { useSelector } from 'react-redux';
import { selectNextPlayer, selectWinner } from './statusSlice';

const Status: React.FC = () => {
  const nextPlayer = useSelector(selectNextPlayer);
  const winner = useSelector(selectWinner);

  if (nextPlayer) {
    return (<div>Next: {nextPlayer.disk}</div>);
  } else if (winner) {
    return (<div>{winner.disk} won</div>);
  } else {
    return (<div>Draw game.</div>);
  }
};

export default Status;