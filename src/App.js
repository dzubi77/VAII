import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import CourseMenu from './pages/CourseMenu';
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />}/>
        <Route path='/courses' element={<CourseMenu/>}/>
      </Routes>
      <Footer/ > 
    </>
  );
}

export default App;
