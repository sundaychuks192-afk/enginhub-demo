import { Link } from 'react-router-dom';

export default function AITutor() {
  return (
    <div className="container">
      <span className="eyebrow">ENGIHUB AI</span>
      <h1>Engineering AI Tutor</h1>
      <p className="lead">Ask for explanations, hints and guided problem-solving help. The secure AI connection will be added after the backend is connected.</p>
      <div className="card">
        <h2>How it will work</h2>
        <p>EngiHub will provide the course context to a server-side AI service so students can ask questions without exposing provider secrets in the browser.</p>
        <div className="feature-grid">
          {['Explain a concept','Give a hint','Explain a mistake','Generate practice'].map(x => (
            <div className="card" key={x}><span className="tag">PLANNED</span><h3>{x}</h3><p>AI-assisted learning feature.</p></div>
          ))}
        </div>
      </div>
      <Link className="secondary" to="/courses">Back to courses</Link>
    </div>
  );
}
