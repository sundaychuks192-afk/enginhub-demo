import { Link } from 'react-router-dom';

const features = [
  ['Virtual Laboratory', 'Practice procedures and experiments digitally.'],
  ['3D Engineering Models', 'Explore components and systems interactively.'],
  ['Fault Diagnosis', 'Investigate symptoms, measurements and possible causes.'],
  ['Project Workspace', 'Design and document engineering projects.'],
];

export default function Workshop() {
  return (
    <div className="container">
      <span className="eyebrow">ENGIHUB WORKSHOP</span>
      <h1>Virtual Engineering Workshop</h1>
      <p className="lead">The long-term goal is a digital workshop where engineering students can inspect, test, diagnose and design.</p>
      <div className="feature-grid">
        {features.map(([title, text]) => (
          <div className="card" key={title}><span className="tag">ROADMAP</span><h2>{title}</h2><p>{text}</p></div>
        ))}
      </div>
      <Link className="primary" to="/projects">Open project area</Link>
    </div>
  );
}
