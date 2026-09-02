import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Topic from './pages/Topic';
import Practice from './pages/Practice';
import Login from './pages/Login';
import AITutor from './pages/AITutor';
import Projects from './pages/Projects';
import Workshop from './pages/Workshop';
import AcademicSetup from './pages/AcademicSetup';
import { LecturerDashboard, AdminDashboard } from './pages/RoleDashboards';

function RequireAuth({children}) {
  const user = localStorage.getItem('engihub_user');
  return user ? children : <Navigate to="/login" replace />;
}

export default function App(){
 return <Routes>
  <Route element={<Layout />}>
   <Route path="/" element={<Home/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/setup" element={<RequireAuth><AcademicSetup/></RequireAuth>}/>
   <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>}/>
   <Route path="/courses" element={<RequireAuth><Courses/></RequireAuth>}/>
   <Route path="/topic" element={<RequireAuth><Topic/></RequireAuth>}/>
   <Route path="/practice" element={<RequireAuth><Practice/></RequireAuth>}/>
   <Route path="/ai-tutor" element={<RequireAuth><AITutor/></RequireAuth>}/>
   <Route path="/workshop" element={<RequireAuth><Workshop/></RequireAuth>}/>
   <Route path="/projects" element={<RequireAuth><Projects/></RequireAuth>}/>
   <Route path="/lecturer" element={<RequireAuth><LecturerDashboard/></RequireAuth>}/>
   <Route path="/admin" element={<RequireAuth><AdminDashboard/></RequireAuth>}/>
   <Route path="*" element={<Navigate to="/" replace/>}/>
  </Route>
 </Routes>
}
