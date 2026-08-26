import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Topic from './pages/Topic';
import Practice from './pages/Practice';
import Login from './pages/Login';
import ComingSoon from './pages/ComingSoon';
import AITutor from './pages/AITutor';
import Projects from './pages/Projects';
import Workshop from './pages/Workshop';
import { LecturerDashboard, AdminDashboard } from './pages/RoleDashboards';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/ai-tutor" element={<AITutor />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/lecturer" element={<LecturerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
