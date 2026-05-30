import { useParams, useNavigate } from 'react-router-dom';

const topicData = {
  'Reasoning': [
    'Coding-Decoding', 'Blood Relations', 'Direction Sense',
    'Syllogism', 'Series Completion', 'Analogy',
    'Puzzles', 'Seating Arrangement', 'Venn Diagrams',
    'Statement-Conclusion', 'Input-Output', 'Data Sufficiency'
  ],
  'Quantitative Aptitude': [
    'Number System', 'Percentage', 'Profit & Loss',
    'Simple & Compound Interest', 'Time & Work', 'Speed-Distance-Time',
    'Ratio & Proportion', 'Algebra', 'Geometry',
    'Mensuration', 'Trigonometry', 'Data Interpretation'
  ],
  'English': [
    'Reading Comprehension', 'Fill in the Blanks', 'Error Detection',
    'Sentence Improvement', 'Para Jumbles', 'Cloze Test',
    'Synonyms & Antonyms', 'One Word Substitution', 'Idioms & Phrases'
  ],
  'General Knowledge': [
    'History', 'Geography', 'Polity', 'Economy',
    'Science & Technology', 'Sports', 'Awards & Honours',
    'Government Schemes', 'International Affairs', 'Current Affairs'
  ],
  'Banking Awareness': [
    'RBI & Monetary Policy', 'Banking Terms', 'Financial Institutions',
    'Insurance', 'Capital Markets', 'Government Schemes'
  ],
  'General Science': [
    'Physics', 'Chemistry', 'Biology', 'Environmental Science'
  ],
  'Indian Laws': [
    'IPC Sections', 'CrPC', 'Evidence Act', 'Cyber Laws'
  ],
  'Network Security': [
    'Firewalls', 'IDS/IPS', 'VPN', 'Network Protocols',
    'Wireless Security', 'Network Attacks'
  ],
  'Ethical Hacking': [
    'Reconnaissance', 'Scanning', 'Exploitation',
    'Post Exploitation', 'Social Engineering', 'Web App Hacking'
  ],
  'Cryptography': [
    'Symmetric Encryption', 'Asymmetric Encryption', 'Hashing',
    'Digital Signatures', 'PKI', 'SSL/TLS'
  ],
  'Cyber Laws': [
    'IT Act 2000', 'GDPR Basics', 'Indian Cyber Laws',
    'Data Protection', 'Cybercrime Types'
  ],
  'Maths': [
    'Number System', 'Percentage', 'Profit & Loss',
    'Time & Work', 'Speed-Distance-Time', 'Algebra', 'Geometry'
  ],
  'Technical': [
    'Computer Networks', 'Operating Systems', 'DBMS',
    'Data Structures', 'Programming Basics', 'Software Engineering'
  ],
  'History': [
    'Ancient India', 'Medieval India', 'Modern India',
    'World History', 'Freedom Struggle'
  ],
  'Geography': [
    'Physical Geography', 'Indian Geography', 'World Geography',
    'Climate', 'Resources'
  ],
  'Polity': [
    'Constitution', 'Parliament', 'Judiciary',
    'State Government', 'Elections', 'Amendments'
  ],
  'Economy': [
    'Basic Economics', 'Indian Economy', 'Budget',
    'Banking System', 'International Trade'
  ],
};

const difficulties = [
  { level: 'easy', label: 'Easy', color: '#27500A', bg: '#EAF3DE' },
  { level: 'medium', label: 'Medium', color: '#633806', bg: '#FAEEDA' },
  { level: 'hard', label: 'Hard', color: '#712B13', bg: '#FAECE7' },
  { level: 'expert', label: 'Expert', color: '#3C3489', bg: '#EEEDFE' },
];

function TopicPage() {
  const { examName, subjectName } = useParams();
  const navigate = useNavigate();
  const topics = topicData[subjectName] || [];

  return (
    <div style={{minHeight:'100vh',background:'#f5f6fa'}}>
      <nav style={{background:'white',padding:'14px 32px',display:'flex',alignItems:'center',gap:'16px',boxShadow:'0 1px 8px rgba(0,0,0,0.07)'}}>
        <button onClick={() => navigate('/exam/' + examName)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer'}}>←</button>
        <div style={{fontSize:'18px',fontWeight:'700'}}>📚 {subjectName}</div>
      </nav>
      <div style={{maxWidth:'960px',margin:'0 auto',padding:'40px 24px'}}>
        <h1 style={{fontSize:'24px',fontWeight:'700',marginBottom:'6px'}}>Choose a Topic</h1>
        <p style={{color:'#888',fontSize:'14px',marginBottom:'32px'}}>Select topic then pick difficulty — quiz starts!</p>
        {topics.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px',color:'#888'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🚧</div>
            <h3>Topics coming soon for {subjectName}</h3>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'14px'}}>
            {topics.map((topic) => (
              <div key={topic} style={{background:'white',borderRadius:'12px',padding:'16px 20px',boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
                <div style={{fontSize:'14px',fontWeight:'600',color:'#1a1a2e',marginBottom:'12px'}}>{topic}</div>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                  {difficulties.map((d) => (
                    <button key={d.level}
                      onClick={() => navigate('/quiz/' + examName + '/' + subjectName + '/' + topic + '/' + d.level)}
                      style={{background:d.bg,color:d.color,border:'none',borderRadius:'6px',padding:'4px 10px',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TopicPage;