import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { courses, ptiQuestions } from '../data/demo';
import logo from '../assets/engihub-logo.svg';

export default function Layout(){
 const nav=useNavigate(); const [open,setOpen]=useState(false); const [query,setQuery]=useState('');
 const user=JSON.parse(localStorage.getItem('engihub_user')||'null');
 const links=[['/dashboard','Home'],['/courses','Learn'],['/practice','Practice'],['/ai-tutor','AI Engine'],['/workshop','Virtual Lab'],['/projects','Projects']];
 const results=query.trim()? [...courses.map(c=>({title:c.name,meta:`${c.code} • Course`,to:'/topic'})),...ptiQuestions.map(q=>({title:q.q,meta:`PTI ${q.year} • Past question`,to:'/practice'}))].filter(x=>(x.title+x.meta).toLowerCase().includes(query.toLowerCase())).slice(0,6):[];
 return <div className="app">
  <header className="topbar">
   <Link to="/" className="brand" aria-label="EngiHub home"><img src={logo} alt="EngiHub" /></Link>
   <nav className="main-nav" aria-label="EngiHub main navigation">{links.map(([to,label])=><NavLink key={to} to={to}>{label}</NavLink>)}</nav>
   <div className="top-actions">
    {user&&<div className="quick-actions"><NavLink className="quick-practice" to="/practice">Practice</NavLink><NavLink className="quick-ai" to="/ai-tutor">AI Engine</NavLink></div>}
    {user&&<button className="search-pill" onClick={()=>setOpen(true)}>⌕ <span>Search EngiHub</span></button>}
    {user?<button className="user-mini" onClick={()=>{localStorage.removeItem('engihub_user');nav('/')}}><span>{(user.name||user.email||'G').charAt(0).toUpperCase()}</span></button>:<NavLink className="login" to="/login">Sign in</NavLink>}
   </div>
  </header>
  <main><Outlet/></main>
  {user&&<div className="mobile-quickbar"><NavLink to="/practice"><b>✓</b><span>Practice</span></NavLink><NavLink to="/ai-tutor"><b>✦</b><span>AI Engine</span></NavLink><NavLink to="/courses"><b>▦</b><span>My Courses</span></NavLink></div>}
  <footer><span>ENGIHUB</span><span>Learn • Understand • Practise • Simulate • Build</span><span>Engineering education, drawn to scale.</span></footer>
  {open&&<div className="search-modal" onMouseDown={()=>setOpen(false)}><div className="search-box" onMouseDown={e=>e.stopPropagation()}><div className="search-head"><span>⌕</span><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses, topics, formulas, PTI questions..."/><button onClick={()=>setOpen(false)}>Esc</button></div>{results.length?<div className="search-results">{results.map((r,i)=><button key={i} onClick={()=>{setOpen(false);nav(r.to)}}><strong>{r.title}</strong><small>{r.meta}</small></button>)}</div>:<div className="search-empty">Try <b>Newton's second law</b>, <b>MEC 124</b>, or <b>PTI questions</b>.</div>}</div></div>}
 </div>
}
