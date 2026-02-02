import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleGetStarted = () => {
    if (role === 'college') {
      navigate('/college');
    } else if (role === 'company') {
      navigate('/company');
    } else {
      navigate('/projects');
    }
  };

  return (
    <>
      <div className="hero">
        <div>
          <h1>Connect Academia with Industry</h1>
          <p>
            Post projects • Get mentorship • Build real-world solutions
          </p>

          <button onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        {/* ONLINE IMAGE – NO IMPORT NEEDED */}
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
          alt="Industry Academia Collaboration"
        />
      </div>

      <div className="section">
        <h2>Why ProjectBridge?</h2>

        <div className="grid">
          <div className="card">
            <h3>Real Projects</h3>
            <p>Industry-aligned problem statements.</p>
          </div>

          <div className="card">
            <h3>Mentorship</h3>
            <p>Guidance from professionals.</p>
          </div>

          <div className="card">
            <h3>Collaboration</h3>
            <p>Colleges and companies work together.</p>
          </div>
        </div>
      </div>
    </>
  );
}