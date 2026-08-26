import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  const links = [
    ['/dashboard', 'Dashboard'],
    ['/courses', 'Courses'],
    ['/practice', 'Practice'],
    ['/ai-tutor', 'AI Tutor'],
    ['/workshop', 'Workshop'],
    ['/projects', 'Projects'],
  ];
  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand"><span className="brandmark">E</span>ENGIHUB</NavLink>
        <nav>{links.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}</nav>
        <NavLink className="login" to="/login">Login</NavLink>
      </header>
      <main><Outlet /></main>
      <footer>ENGIHUB • Learn. Understand. Practice. Build.</footer>
    </div>
  );
}
