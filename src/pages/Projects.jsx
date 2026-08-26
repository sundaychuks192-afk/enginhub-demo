import { Link } from 'react-router-dom';

export default function Projects() {
  return (
    <div className="container">
      <span className="eyebrow">ENGINEERING PROJECTS</span>
      <h1>My Projects</h1>
      <p className="lead">A future workspace for designing, testing and documenting engineering ideas.</p>
      <div className="card">
        <span className="tag">MVP PREVIEW</span>
        <h2>Project Builder</h2>
        <p>Students will eventually define a problem, research it, design a solution, test it, record results and build a portfolio entry.</p>
        <button className="primary button">Create project — coming soon</button>
      </div>
      <Link className="secondary" to="/workshop">Explore virtual workshop</Link>
    </div>
  );
}
