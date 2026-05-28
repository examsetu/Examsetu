import '../App.css';

function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">📚 ExamSetu</div>
        <div className="nav-links">
          <button className="nav-btn">Exams</button>
          <button className="nav-btn">Notes</button>
          <button className="nav-btn">Current Affairs</button>
          <button className="nav-btn">Leaderboard</button>
        </div>
        <div className="nav-btns">
          <button className="btn-outline" onClick={() => window.location.href='/login'}>Login</button>
          <button className="btn-primary" onClick={() => window.location.href='/register'}>Start Free</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-tag">🇮🇳 India's #1 Govt Exam Prep Platform</div>
        <h1>Crack SSC, Railways, Police,<br/>Banking & Cyber Exams</h1>
        <p>Topic-wise MCQs from Easy to Expert · Adaptive learning · Daily current affairs</p>
        <div className="hero-btns">
          <button className="btn-primary btn-large" onClick={() => window.location.href='/register'}>Start Preparing Free</button>
          <button className="btn-outline btn-large">View All Exams</button>
        </div>
        <div className="stats-row">
          <div className="stat"><strong>50,000+</strong><span>Students</span></div>
          <div className="stat"><strong>10,000+</strong><span>Questions</span></div>
          <div className="stat"><strong>9</strong><span>Exam categories</span></div>
          <div className="stat"><strong>Daily</strong><span>Current affairs</span></div>
        </div>
      </section>
    </div>
  );
}

export default Home;