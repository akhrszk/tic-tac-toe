import React from 'react';
import Table from '../features/board/Table';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic-Tac-Toe</h1>
      </header>
      <Table />
    </div>
  )
};

export default App;
