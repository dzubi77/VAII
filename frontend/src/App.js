import { Routes, Route } from "react-router-dom"
import { Home } from './pages/Home';
import { Login } from './pages/Login'
import { CourseMenu } from './pages/CourseMenu';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { EditCourse } from './pages/page_components/EditCourse';
import { SignUp } from "./pages/SignUp";
import { PrivateRoute } from "./layout/PrivateRoute";
import { Unauthorized } from "./layout/UnauthorizedPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/courses' element={<CourseMenu/>}/>

        <Route path='/edit_course' element={<PrivateRoute allowedRoles={['teacher', 'admin']}><EditCourse/></PrivateRoute>}/>
        <Route path='/edit_course/:courseId' element={<PrivateRoute allowedRoles={['teacher', 'admin']}><EditCourse/></PrivateRoute>}/>
        <Route path='/my_profile' element={<PrivateRoute allowedRoles={['teacher', 'student', 'admin']}><EditCourse/></PrivateRoute>}/>

        <Route path='/unauthorized' element={<Unauthorized/>}/>
      </Routes> 
      <Footer />
    </>
  );
}

export default App;
