 import './App.css';

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">📚 ExamSetu</div>
        <div className="nav-links">
  <button className="nav-btn">Exams</button>
  <button className="nav-btn">Notes</button>
  <button className="nav-btn">Current Affairs</button>
  <button className="nav-btn">Leaderboard</button>
</div>
        <div className="nav-btns">
          <button className="btn-outline">Login</button>
          <button className="btn-primary">Start Free</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-tag">🇮🇳 India's #1 Govt Exam Prep</div>
        <h1>Crack SSC, Railways, Police, Banking & Cyber</h1>
        <p>Topic-wise MCQs · Adaptive learning · Daily current affairs</p>
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

export default App;