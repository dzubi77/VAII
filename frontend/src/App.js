import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Home } from './pages/Home';
import { Login } from './pages/Login'
import { CourseMenu } from './pages/CourseMenu';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { EditCourse } from './pages/page_components/EditCourse';
import { SignUp } from "./pages/SignUp";
import { PrivateRoute } from "./layout/PrivateRoute";
import { Unauthorized } from "./layout/UnauthorizedPage";
import { UserProvider } from "./service/UserProvider";
import { MyProfile } from "./pages/MyProfile";
import { CourseViewMoreInfo } from "./pages/page_components/Course";
import { EditFeedback } from "./pages/page_components/StudentFeedback";
import '../src/styles/home_style.css'

function App() {
  return (
    <>
      <div className="app-container">
        <BrowserRouter>
          <UserProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              <Route path='/courses' element={<CourseMenu/>}/>
              <Route path="/course/:courseId" element={<CourseViewMoreInfo />} />

              <Route path="/course/:courseId/add-feedback" element={<EditFeedback />} />
              <Route path="/course/:courseId/edit-feedback/:feedbackId" element={<EditFeedback />} /> 

              <Route path='/edit_course' element={<PrivateRoute allowedRoles={['TEACHER', 'ADMIN']}><EditCourse/></PrivateRoute>}/>
              <Route path='/edit_course/:courseId' element={<PrivateRoute allowedRoles={['TEACHER', 'ADMIN']}><EditCourse/></PrivateRoute>}/>
              <Route path='/my_profile' element={<PrivateRoute allowedRoles={['TEACHER', 'STUDENT', 'ADMIN']}><MyProfile/></PrivateRoute>}/>

              <Route path='/unauthorized' element={<Unauthorized/>}/>
            </Routes>
            <Footer />
          </UserProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
