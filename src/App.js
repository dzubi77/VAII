import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='login' element={<Login />}/>
        </Routes>
    </>
  );
}

export default App;
