import './App.css';
import Main from '../Main/Main.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />}/>
      </Routes>
    </>
  );
}

export default App;
