import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';

function App() {
  // let ping = await axios.get()
  useEffect(()=> {

  })
  return (
    <>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
    </>
  );
}

export default App;
