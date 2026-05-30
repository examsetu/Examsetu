import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'examsetu@admin2025';

const examCategories = ['SSC','Railways','Banking','Police','Defence','PSU','State PSC','Cybersecurity'];
const subjects = {
  SSC: ['Reasoning','Quantitative Aptitude','English','General Knowledge'],
  Railways: ['Reasoning','Maths','General Science','General Knowledge'],
  Banking: ['Reasoning','Quantitative Aptitude','English','Banking Awareness'],
  Police: ['Reasoning','General Knowledge','English','Indian Laws'],
  Defence: ['Maths','English','General Knowledge','General Science'],
  PSU: ['Technical','Reasoning','General Knowledge'],
  'State PSC': ['History','Geography','Polity','Economy'],
  Cybersecurity: ['Network Security','Ethical Hacking','Cryptography','Cyber Laws'],
};

const topicsMap = {
  'Reasoning': ['Coding-Decoding','Blood Relations','Direction Sense','Syllogism','Series Completion','Analogy','Puzzles','Seating Arrangement','Venn Diagrams','Statement-Conclusion','Input-Output','Data Sufficiency'],
  'Quantitative Aptitude': ['Number System','Percentage','Profit & Loss','Simple & Compound Interest','Time & Work','Speed-Distance-Time','Ratio & Proportion','Algebra','Geometry','Mensuration','Trigonometry','Data Interpretation'],
  'English': ['Reading Comprehension','Fill in the Blanks','Error Detection','Sentence Improvement','Para Jumbles','Synonyms & Antonyms','Idioms & Phrases'],
  'General Knowledge': ['History','Geography','Polity','Economy','Science & Technology','Sports','Awards & Honours','Government Schemes','Current Affairs'],
  'Maths': ['Number System','Percentage','Profit & Loss','Time & Work','Speed-Distance-Time','Algebra','Geometry'],
  'General Science': ['Physics','Chemistry','Biology','Environmental Science'],
  'Banking Awareness': ['RBI & Monetary Policy','Banking Terms','Financial Institutions','Insurance','Capital Markets'],
  'Indian Laws': ['IPC Sections','CrPC','Evidence Act','Cyber Laws'],
  'History': ['Ancient India','Medieval India','Modern India','Freedom Struggle'],
  'Geography': ['Physical Geography','Indian Geography','World Geography','Climate'],
  'Polity': ['Constitution','Parliament','Judiciary','State Government','Elections'],
  'Economy': ['Basic Economics','Indian Economy','Budget','Banking System'],
  'Technical': ['Computer Networks','Operating Systems','DBMS','Data Structures'],
  'Network Security': ['Firewalls','IDS/IPS','VPN','Network Protocols','Network Attacks'],
  'Ethical Hacking': ['Reconnaissance','Scanning','Exploitation','Social Engineering','Web App Hacking'],
  'Cryptography': ['Symmetric Encryption','Asymmetric Encryption','Hashing','Digital Signatures'],
  'Cyber Laws': ['IT Act 2000','GDPR Basics','Indian Cyber Laws','Data Protection'],
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const [tab, setTab] = useState('add');
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState({ questions: 0, attempts: 0 });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [form, setForm] = useState({
    exam_category: 'SSC',
    subject: 'Reasoning',
    topic: 'Coding-Decoding',
    difficulty: 'easy',
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'A',
    explanation: '',
  });

  useEffect(() => {
    if (authed) {
      loadQuestions();
      loadStats();
    }
  }, [authed]);

  const loadQuestions = async () => {
    const { data } = await supabase.from('questions').select('*').order('created_at', { ascending: false }).limit(50);
    if (data) setQuestions(data);
  };

  const loadStats = async () => {
    const { count: qCount } = await supabase.from('questions').select('*', { count: 'exact', head: true });
    const { count: aCount } = await supabase.from('quiz_attempts').select('*', { count: 'exact', head: true });
    setStats({ questions: qCount || 0, attempts: aCount || 0 });
  };

  const handleLogin = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setPwError('Wrong password. Try again.');
    }
  };

  const handleSave = async () => {
    if (!form.question_text || !form.option_a || !form.option_b || !form.option_c || !form.option_d) {
      alert('Please fill all fields before saving.');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('questions').insert(form);
    if (error) {
      alert('Error saving: ' + error.message);
    } else {
      setSuccessMsg('Question saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      setForm({ ...form, question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_answer: 'A', explanation: '' });
      loadQuestions();
      loadStats();
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    await supabase.from('questions').delete().eq('id', id);
    loadQuestions();
    loadStats();
  };

  const currentSubjects = subjects[form.exam_category] || [];
  const currentTopics = topicsMap[form.subject] || [];

  if (!authed) {
    return (
      <div style={{minHeight:'100vh',background:'#f5f6fa',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{background:'white',borderRadius:'16px',padding:'40px',width:'100%',maxWidth:'380px',boxShadow:'0 4px 24px rgba(0,0,0,0.08)',textAlign:'center'}}>
          <div style={{fontSize:'32px',marginBottom:'12px'}}>🔐</div>
          <h2 style={{fontSize:'20px',fontWeight:'700',marginBottom:'6px'}}>Admin Panel</h2>
          <p style={{color:'#888',fontSize:'13px',marginBottom:'24px'}}>Enter admin password to continue</p>
          {pwError && <div style={{background:'#fff0f0',color:'#cc0000',padding:'8px 12px',borderRadius:'8px',fontSize:'13px',marginBottom:'12px'}}>{pwError}</div>}
          <input type='password' placeholder='Enter password' value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={{width:'100%',padding:'11px 14px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',outline:'none',marginBottom:'12px'}} />
          <button onClick={handleLogin}
            style={{width:'100%',padding:'12px',background:'#2563eb',color:'white',border:'none',borderRadius:'8px',fontSize:'15px',fontWeight:'600',cursor:'pointer'}}>
            Enter Admin Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh',background:'#f5f6fa'}}>
      <nav style={{background:'#1a1a2e',padding:'14px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontSize:'16px',fontWeight:'700',color:'white'}}>📚 ExamSetu — Admin Panel</div>
        <div style={{display:'flex',gap:'8px'}}>
          {['add','questions','stats'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{padding:'7px 16px',background: tab===t ? '#2563eb' : 'transparent',color:'white',border:'1px solid #444',borderRadius:'8px',fontSize:'13px',cursor:'pointer',textTransform:'capitalize'}}>
              {t === 'add' ? '➕ Add Question' : t === 'questions' ? '📋 All Questions' : '📊 Stats'}
            </button>
          ))}
        </div>
      </nav>

      <div style={{maxWidth:'960px',margin:'0 auto',padding:'32px 24px'}}>

        {tab === 'stats' && (
          <div>
            <h2 style={{fontSize:'22px',fontWeight:'700',marginBottom:'20px'}}>Platform Statistics</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'16px'}}>
              {[
                {label:'Total Questions',value:stats.questions,icon:'❓'},
                {label:'Quiz Attempts',value:stats.attempts,icon:'📝'},
                {label:'Exam Categories',value:8,icon:'📚'},
                {label:'Status',value:'Live ✓',icon:'🟢'},
              ].map(s => (
                <div key={s.label} style={{background:'white',borderRadius:'14px',padding:'24px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
                  <div style={{fontSize:'32px',marginBottom:'8px'}}>{s.icon}</div>
                  <div style={{fontSize:'28px',fontWeight:'800',color:'#2563eb'}}>{s.value}</div>
                  <div style={{fontSize:'13px',color:'#888',marginTop:'4px'}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'add' && (
          <div>
            <h2 style={{fontSize:'22px',fontWeight:'700',marginBottom:'6px'}}>Add New Question</h2>
            <p style={{color:'#888',fontSize:'14px',marginBottom:'24px'}}>Fill the form below — click Save and question goes live instantly</p>
            {successMsg && <div style={{background:'#EAF3DE',border:'1px solid #7DB55A',color:'#27500A',padding:'12px 16px',borderRadius:'8px',marginBottom:'16px',fontWeight:'500'}}>{successMsg}</div>}
            <div style={{background:'white',borderRadius:'16px',padding:'28px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
                <div>
                  <label style={{display:'block',fontSize:'13px',fontWeight:'600',marginBottom:'6px',color:'#444'}}>Exam Category</label>
                  <select value={form.exam_category} onChange={(e) => setForm({...form, exam_category:e.target.value, subject:subjects[e.target.value][0], topic:topicsMap[subjects[e.target.value][0]]?.[0] || ''})}
                    style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',background:'white'}}>
                    {examCategories.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{display:'block',fontSize:'13px',fontWeight:'600',marginBottom:'6px',color:'#444'}}>Subject</label>
                  <select value={form.subject} onChange={(e) => setForm({...form, subject:e.target.value, topic:topicsMap[e.target.value]?.[0] || ''})}
                    style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',background:'white'}}>
                    {currentSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{display:'block',fontSize:'13px',fontWeight:'600',marginBottom:'6px',color:'#444'}}>Topic</label>
                  <select value={form.topic} onChange={(e) => setForm({...form, topic:e.target.value})}
                    style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',background:'white'}}>
                    {currentTopics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{display:'block',fontSize:'13px',fontWeight:'600',marginBottom:'6px',color:'#444'}}>Difficulty Level</label>
                  <select value={form.difficulty} onChange={(e) => setForm({...form, difficulty:e.target.value})}
                    style={{width:'100%',padding:'10px 12px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',background:'white'}}>
                    <option value='easy'>Easy — Direct recall</option>
                    <option value='medium'>Medium — Apply concept</option>
                    <option value='hard'>Hard — Analyse & compare</option>
                    <option value='expert'>Expert — PYQ exam style</option>
                  </select>
                </div>
              </div>

              <div style={{marginBottom:'16px'}}>
                <label style={{display:'block',fontSize:'13px',fontWeight:'600',marginBottom:'6px',color:'#444'}}>Question Text — paste your question here</label>
                <textarea value={form.question_text} onChange={(e) => setForm({...form, question_text:e.target.value})}
                  placeholder='Type or paste the full question here...'
                  rows={3}
                  style={{width:'100%',padding:'11px 14px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',outline:'none',resize:'vertical',fontFamily:'inherit'}} />
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
                {['a','b','c','d'].map((opt) => (
                  <div key={opt}>
                    <label style={{display:'block',fontSize:'13px',fontWeight:'600',marginBottom:'6px',color:'#444'}}>Option {opt.toUpperCase()}</label>
                    <input type='text' value={form['option_'+opt]} onChange={(e) => setForm({...form, ['option_'+opt]:e.target.value})}
                      placeholder={'Option ' + opt.toUpperCase()}
                      style={{width:'100%',padding:'10px 14px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',outline:'none'}} />
                  </div>
                ))}
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
                <div>
                  <label style={{display:'block',fontSize:'13px',fontWeight:'600',marginBottom:'6px',color:'#444'}}>Correct Answer</label>
                  <select value={form.correct_answer} onChange={(e) => setForm({...form, correct_answer:e.target.value})}
                    style={{width:'100%',padding:'10px 12px',border:'1.5px solid #2563eb',borderRadius:'8px',fontSize:'14px',background:'#eff6ff'}}>
                    <option value='A'>A — {form.option_a || 'Option A'}</option>
                    <option value='B'>B — {form.option_b || 'Option B'}</option>
                    <option value='C'>C — {form.option_c || 'Option C'}</option>
                    <option value='D'>D — {form.option_d || 'Option D'}</option>
                  </select>
                </div>
                <div>
                  <label style={{display:'block',fontSize:'13px',fontWeight:'600',marginBottom:'6px',color:'#444'}}>Explanation (why this answer is correct)</label>
                  <input type='text' value={form.explanation} onChange={(e) => setForm({...form, explanation:e.target.value})}
                    placeholder='Brief explanation shown after answering...'
                    style={{width:'100%',padding:'10px 14px',border:'1.5px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',outline:'none'}} />
                </div>
              </div>

              <button onClick={handleSave} disabled={saving}
                style={{width:'100%',padding:'14px',background: saving ? '#93b4f0' : '#2563eb',color:'white',border:'none',borderRadius:'10px',fontSize:'16px',fontWeight:'700',cursor: saving ? 'not-allowed' : 'pointer'}}>
                {saving ? 'Saving...' : '💾 Save Question — Goes Live Instantly'}
              </button>
            </div>
          </div>
        )}

        {tab === 'questions' && (
          <div>
            <h2 style={{fontSize:'22px',fontWeight:'700',marginBottom:'6px'}}>All Questions ({questions.length} shown)</h2>
            <p style={{color:'#888',fontSize:'14px',marginBottom:'20px'}}>Most recent questions first</p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {questions.map((q) => (
                <div key={q.id} style={{background:'white',borderRadius:'12px',padding:'16px 20px',boxShadow:'0 2px 8px rgba(0,0,0,0.05)',display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'12px'}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:'6px',marginBottom:'6px',flexWrap:'wrap'}}>
                      <span style={{fontSize:'10px',background:'#E6F1FB',color:'#0C447C',padding:'2px 8px',borderRadius:'99px',fontWeight:'600'}}>{q.exam_category}</span>
                      <span style={{fontSize:'10px',background:'#f5f6fa',color:'#555',padding:'2px 8px',borderRadius:'99px'}}>{q.subject}</span>
                      <span style={{fontSize:'10px',background:'#f5f6fa',color:'#555',padding:'2px 8px',borderRadius:'99px'}}>{q.topic}</span>
                      <span style={{fontSize:'10px',background: q.difficulty==='easy'?'#EAF3DE':q.difficulty==='medium'?'#FAEEDA':q.difficulty==='hard'?'#FAECE7':'#EEEDFE',color: q.difficulty==='easy'?'#27500A':q.difficulty==='medium'?'#633806':q.difficulty==='hard'?'#712B13':'#3C3489',padding:'2px 8px',borderRadius:'99px',fontWeight:'600'}}>{q.difficulty}</span>
                    </div>
                    <p style={{fontSize:'13px',color:'#1a1a2e',fontWeight:'500',marginBottom:'4px'}}>{q.question_text}</p>
                    <p style={{fontSize:'11px',color:'#888'}}>A: {q.option_a} | B: {q.option_b} | C: {q.option_c} | D: {q.option_d} | ✓ {q.correct_answer}</p>
                  </div>
                  <button onClick={() => handleDelete(q.id)}
                    style={{background:'#fff0f0',color:'#cc0000',border:'1px solid #ffcccc',borderRadius:'8px',padding:'6px 12px',fontSize:'12px',cursor:'pointer',flexShrink:0}}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}