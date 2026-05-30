import { useParams, useNavigate } from 'react-router-dom';

const examData = {
  SSC: {
    subjects: [
      { name: 'Reasoning', icon: '🧠', topics: 12 },
      { name: 'Quantitative Aptitude', icon: '🔢', topics: 15 },
      { name: 'English', icon: '📝', topics: 10 },
      { name: 'General Knowledge', icon: '🌍', topics: 14 },
    ]
  },
  Railways: {
    subjects: [
      { name: 'Reasoning', icon: '🧠', topics: 12 },
      { name: 'Maths', icon: '🔢', topics: 15 },
      { name: 'General Science', icon: '🔬', topics: 8 },
      { name: 'General Knowledge', icon: '🌍', topics: 14 },
    ]
  },
  Banking: {
    subjects: [
      { name: 'Reasoning', icon: '🧠', topics: 12 },
      { name: 'Quantitative Aptitude', icon: '🔢', topics: 15 },
      { name: 'English', icon: '📝', topics: 10 },
      { name: 'Banking Awareness', icon: '🏦', topics: 10 },
    ]
  },
  Police: {
    subjects: [
      { name: 'Reasoning', icon: '🧠', topics: 12 },
      { name: 'General Knowledge', icon: '🌍', topics: 14 },
      { name: 'English', icon: '📝', topics: 8 },
      { name: 'Indian Laws', icon: '⚖️', topics: 6 },
    ]
  },
  Defence: {
    subjects: [
      { name: 'Maths', icon: '🔢', topics: 15 },
      { name: 'English', icon: '📝', topics: 10 },
      { name: 'General Knowledge', icon: '🌍', topics: 14 },
      { name: 'General Science', icon: '🔬', topics: 8 },
    ]
  },
  PSU: {
    subjects: [
      { name: 'Technical', icon: '⚙️', topics: 20 },
      { name: 'Reasoning', icon: '🧠', topics: 12 },
      { name: 'General Knowledge', icon: '🌍', topics: 14 },
    ]
  },
  'State PSC': {
    subjects: [
      { name: 'History', icon: '📜', topics: 10 },
      { name: 'Geography', icon: '🗺️', topics: 8 },
      { name: 'Polity', icon: '🏛️', topics: 10 },
      { name: 'Economy', icon: '💰', topics: 8 },
    ]
  },
  Cybersecurity: {
    subjects: [
      { name: 'Network Security', icon: '🔒', topics: 10 },
      { name: 'Ethical Hacking', icon: '💻', topics: 12 },
      { name: 'Cryptography', icon: '🔑', topics: 8 },
      { name: 'Cyber Laws', icon: '⚖️', topics: 6 },
    ]
  },
};

function ExamPage() {
  const { examName } = useParams();
  const navigate = useNavigate();
  const exam = examData[examName];

  if (!exam) {
    return (
      <div style={{padding:'40px',textAlign:'center'}}>
        <h2>Exam not found</h2>
        <button onClick={() => navigate('/dashboard')}>Go back</button>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh',background:'#f5f6fa'}}>
      <nav style={{background:'white',padding:'14px 32px',display:'flex',alignItems:'center',gap:'16px',boxShadow:'0 1px 8px rgba(0,0,0,0.07)'}}>
        <button onClick={() => navigate('/dashboard')} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer'}}>←</button>
        <div style={{fontSize:'18px',fontWeight:'700'}}>📚 {examName} Preparation</div>
      </nav>
      <div style={{maxWidth:'960px',margin:'0 auto',padding:'40px 24px'}}>
        <h1 style={{fontSize:'24px',fontWeight:'700',marginBottom:'6px'}}>Choose a Subject</h1>
        <p style={{color:'#888',fontSize:'14px',marginBottom:'32px'}}>Select a subject to see topics and start practising</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'16px'}}>
          {exam.subjects.map((subject) => (
            <div key={subject.name}
              onClick={() => navigate('/topic/' + examName + '/' + subject.name)}
              style={{background:'white',borderRadius:'14px',padding:'28px 20px',cursor:'pointer',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
              <div style={{fontSize:'36px',marginBottom:'12px'}}>{subject.icon}</div>
              <div style={{fontSize:'15px',fontWeight:'600',color:'#1a1a2e',marginBottom:'4px'}}>{subject.name}</div>
              <div style={{fontSize:'12px',color:'#888'}}>{subject.topics} topics available</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamPage;