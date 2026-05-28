import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const exams = [
    { icon: '📋', name: 'SSC' },
    { icon: '🚂', name: 'Railways' },
    { icon: '🛡️', name: 'Police' },
    { icon: '🏦', name: 'Banking' },
    { icon: '⚔️', name: 'Defence' },
    { icon: '🏭', name: 'PSU' },
    { icon: '📜', name: 'State PSC' },
    { icon: '🔐', name: 'Cybersecurity' },
  ];

  return (
    <div style={{minHeight:'100vh',background:'#f5f6fa'}}>
      <nav style={{background:'white',padding:'14px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 1px 8px rgba(0,0,0,0.07)'}}>
        <div style={{fontSize:'18px',fontWeight:'700'}}>📚 ExamSetu</div>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{fontSize:'14px',color:'#555'}}>👋 {user?.user_metadata?.full_name || user?.email}</span>
          <button onClick={handleLogout} style={{background:'transparent',border:'1.5px solid #e0e0e0',borderRadius:'8px',padding:'7px 16px',fontSize:'13px',cursor:'pointer'}}>Logout</button>
        </div>
      </nav>
      <div style={{maxWidth:'960px',margin:'0 auto',padding:'40px 24px'}}>
        <h1 style={{fontSize:'26px',fontWeight:'700',marginBottom:'6px'}}>Your Dashboard</h1>
        <p style={{color:'#888',fontSize:'14px',marginBottom:'32px'}}>Choose an exam to start preparing</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px'}}>
          {exams.map((exam) => (
            <div key={exam.name} style={{background:'white',borderRadius:'14px',padding:'28px 16px',textAlign:'center',cursor:'pointer',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
              <span style={{fontSize:'32px'}}>{exam.icon}</span>
              <span style={{fontSize:'14px',fontWeight:'600',color:'#1a1a2e'}}>{exam.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;