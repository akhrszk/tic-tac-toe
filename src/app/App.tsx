import React from 'react';
import Table from '../features/board/Table';
import Status from '../features/status/Status';
import MoveList from '../features/history/MoveList';

import './App.css';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <h1>Tic-Tac-Toe</h1>
    </header>
    <Table />
    <Status/>
    <MoveList />
  </div>
);

export default App;
