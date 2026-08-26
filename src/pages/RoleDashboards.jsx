export function LecturerDashboard() {
  return <div className="container"><span className="eyebrow">LECTURER</span><h1>Lecturer Dashboard</h1><p className="lead">Content management, assignments, student progress and class tools will connect to Supabase.</p><div className="feature-grid">{['Courses','Topics & lessons','Assignments','Student progress'].map(x=><div className="card" key={x}><span className="tag">MVP ROADMAP</span><h3>{x}</h3><p>Backend connection pending.</p></div>)}</div></div>;
}
export function AdminDashboard() {
  return <div className="container"><span className="eyebrow">ADMIN</span><h1>Admin Dashboard</h1><p className="lead">Platform management will use real authentication and backend authorization.</p><div className="feature-grid">{['Users','Courses','Departments','Platform overview'].map(x=><div className="card" key={x}><span className="tag">MVP ROADMAP</span><h3>{x}</h3><p>Backend connection pending.</p></div>)}</div></div>;
}
