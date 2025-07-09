import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-light font-sans">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary px-4">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="#">MockItUp</a>
          <div className="d-flex gap-3">
           <button onClick={() => navigate('/home')} className="btn btn-outline-light btn-sm">
              home
            </button>
            <button className="btn btn-outline-light btn-sm">Features</button>
            <button onClick={() => navigate('/login')} className="btn btn-outline-light btn-sm">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="btn btn-success btn-sm">
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-dark text-white text-center py-5 px-3">
        <h1 className="display-5 fw-bold">Hire yourself with AI confidence.</h1>
        <p className="lead mt-3">
          Your AI-powered mock interview coach – speak, answer, and improve.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="btn btn-success btn-lg mt-4"
        >
          Start Now
        </button>
      </section>

{/* Features Section */}
<section className="py-5 px-3 bg-white">
  <h2 className="text-center fw-bold mb-5">Features</h2>
  <div className="container">
    <div className="row g-4">
      {[
        {
          icon: '🎤',
          title: 'Voice Input & Feedback',
          desc: 'Speak freely and get AI-powered insights on your delivery.',
          bg: '#f8f9fa',
        },
        {
          icon: '💬',
          title: 'AI Interviewer',
          desc: 'Realistic AI questions tailored to your role and skills.',
          bg: '#f1f3f5',
        },
        {
          icon: '📊',
          title: 'Analytics Dashboard',
          desc: 'Get performance metrics and improvement tips.',
          bg: '#f8f9fa',
        },
        {
          icon: '👥',
          title: 'Peer + Expert Interviews',
          desc: 'Join mock sessions with peers or expert mentors.',
          bg: '#f1f3f5',
        },
      ].map((feature, idx) => (
        <div key={idx} className="col-12 col-md-6 col-lg-3">
          <div
            className="card h-100 text-center"
            style={{
              backgroundColor: feature.bg,
              border: 'none',
              borderRadius: '0.75rem',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.9)', // 💥 Dark black shadow
              transform: 'scale(1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 1)'; // 💥 Stronger black shadow on hover
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.9)';
            }}
          >
            <div className="card-body px-3">
              <div style={{ fontSize: '2rem' }}>{feature.icon}</div>
              <h5 className="card-title fw-bold mt-3">{feature.title}</h5>
              <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                {feature.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


    </div>
  );
};

export default Landing;
