import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Wrong email or password. Try again.');
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f5f6fa'}}>
      <div style={{background:'white',borderRadius:'16px',padding:'40px',width:'100%',maxWidth:'420px',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        <div style={{fontSize:'22px',fontWeight:'700',marginBottom:'20px'}}>📚 ExamSetu</div>
        <h2 style={{fontSize:'22px',fontWeight:'700',marginBottom:'6px'}}>Welcome back!</h2>
        <p style={{color:'#888',fontSize:'13px',marginBottom:'24px'}}>Login to continue your preparation</p>

        {error && (
          <div style={{background:'#fff0f0',border:'1px solid #ffcccc',color:'#cc0000',padding:'10px 14px',borderRadius:'8px',fontSize:'13px',marginBottom:'16px'}}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'13px',fontWeight:'500',marginBottom:'6px'}}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{width:'100%',padding:'11px 14px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',outline:'none'}}
            />
          </div>
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'13px',fontWeight:'500',marginBottom:'6px'}}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{width:'100%',padding:'11px 14px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',outline:'none'}}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{width:'100%',padding:'13px',background:'#2563eb',color:'white',border:'none',borderRadius:'8px',fontSize:'15px',fontWeight:'600',cursor:'pointer'}}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{textAlign:'center',marginTop:'20px',fontSize:'13px',color:'#888'}}>
          New here? <Link to="/register" style={{color:'#2563eb',textDecoration:'none',fontWeight:'500'}}>Create free account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;