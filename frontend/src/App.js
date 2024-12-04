import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login'
import CourseMenu from './pages/CourseMenu';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import EditCourse from './pages/page_components/EditCourse';

//main function with routing through the app
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/courses' element={<CourseMenu/>}/>
        <Route path='/edit_course' element={<EditCourse/>}/>
        <Route path='/edit_course/:courseId' element={<EditCourse/>}/>
      </Routes> 
      <Footer />
    </>
  );
}

export default App;
