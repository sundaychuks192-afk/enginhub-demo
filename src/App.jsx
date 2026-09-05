import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { getSession } from './services/authService';

function RequireAuth({children}) {
  const [state,setState]=useState('checking');
  const location=useLocation();
  useEffect(()=>{let alive=true;getSession().then(session=>{if(alive)setState(session?.user||localStorage.getItem('engihub_user')?'ready':'login')}).catch(()=>{if(alive)setState(localStorage.getItem('engihub_user')?'ready':'login')});return()=>{alive=false}},[]);
  if(state==='checking') return <div className="route-loading"><div><span className="eyebrow">ENGIHUB</span><h2>Loading your engineering workspace…</h2><div className="loading-bar"/></div></div>;
  return state==='ready'?children:<Navigate to="/login" replace state={{from:location.pathname}}/>;
}

export default function App(){return <Routes><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/setup" element={<RequireAuth><AcademicSetup/></RequireAuth>}/><Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>}/><Route path="/courses" element={<RequireAuth><Courses/></RequireAuth>}/><Route path="/topic" element={<RequireAuth><Topic/></RequireAuth>}/><Route path="/practice" element={<RequireAuth><Practice/></RequireAuth>}/><Route path="/ai-tutor" element={<RequireAuth><AITutor/></RequireAuth>}/><Route path="/workshop" element={<RequireAuth><Workshop/></RequireAuth>}/><Route path="/projects" element={<RequireAuth><Projects/></RequireAuth>}/><Route path="/lecturer" element={<RequireAuth><LecturerDashboard/></RequireAuth>}/><Route path="/admin" element={<RequireAuth><AdminDashboard/></RequireAuth>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>}
