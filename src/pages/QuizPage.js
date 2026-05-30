import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

function QuizPage() {
  const { examName, subjectName, topicName, difficulty } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    async function loadQuestions() {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('exam_category', examName)
        .eq('subject', subjectName)
        .eq('topic', topicName)
        .eq('difficulty', difficulty)
        .limit(10);

      if (data && data.length > 0) {
        setQuestions(data);
      } else {
        setQuestions([{
          id: '1',
          question_text: 'No questions found for this topic yet. More questions coming soon!',
          option_a: 'OK got it',
          option_b: 'Will check later',
          option_c: 'Add questions please',
          option_d: 'Go back',
          correct_answer: 'A',
          explanation: 'Questions for this topic will be added soon by the admin.'
        }]);
      }
      setLoading(false);
    }
    loadQuestions();
  }, [examName, subjectName, topicName, difficulty]);

  useEffect(() => {
    if (loading || showResult || showExplanation || selected) return;
    if (timer === 0) {
      handleNext();
      return;
    }
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  });

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option);
    setShowExplanation(true);
    if (option === questions[current].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelected(null);
    setTimer(30);
    if (current + 1 >= questions.length) {
      saveScore();
      setShowResult(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const saveScore = async () => {
    if (!user) return;
    await supabase.from('quiz_attempts').insert({
      user_id: user.id,
      exam_category: examName,
      subject: subjectName,
      topic: topicName,
      difficulty: difficulty,
      score: score,
      total: questions.length
    });
  };

  const diffColors = {
    easy: '#27500A', medium: '#633806', hard: '#712B13', expert: '#3C3489'
  };
  const diffBg = {
    easy: '#EAF3DE', medium: '#FAEEDA', hard: '#FAECE7', expert: '#EEEDFE'
  };

  if (loading) {
    return (
      <div style={{padding:'60px',textAlign:'center',fontSize:'18px',color:'#555'}}>
        Loading questions...
      </div>
    );
  }

  if (showResult) {
    const percent = Math.round((score / questions.length) * 100);
    const trophy = percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '📚';
    return (
      <div style={{minHeight:'100vh',background:'#f5f6fa',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{background:'white',borderRadius:'20px',padding:'48px',textAlign:'center',maxWidth:'440px',width:'100%',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
          <div style={{fontSize:'64px',marginBottom:'16px'}}>{trophy}</div>
          <h2 style={{fontSize:'26px',fontWeight:'700',marginBottom:'8px'}}>Quiz Complete!</h2>
          <p style={{color:'#888',marginBottom:'24px'}}>{topicName} — {difficulty} level</p>
          <div style={{background:'#f5f6fa',borderRadius:'12px',padding:'20px',marginBottom:'24px'}}>
            <div style={{fontSize:'48px',fontWeight:'800',color:'#2563eb'}}>{score}/{questions.length}</div>
            <div style={{color:'#888',marginTop:'4px'}}>{percent}% correct</div>
          </div>
          <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
            <button
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setSelected(null);
                setTimer(30);
                setShowResult(false);
                setShowExplanation(false);
              }}
              style={{padding:'12px 20px',background:'#2563eb',color:'white',border:'none',borderRadius:'8px',fontWeight:'600',cursor:'pointer'}}>
              Try Again
            </button>
            <button
              onClick={() => navigate('/topic/' + examName + '/' + subjectName)}
              style={{padding:'12px 20px',background:'#f5f6fa',color:'#1a1a2e',border:'1px solid #e0e0e0',borderRadius:'8px',fontWeight:'600',cursor:'pointer'}}>
              More Topics
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const options = [
    { key: 'A', text: q.option_a },
    { key: 'B', text: q.option_b },
    { key: 'C', text: q.option_c },
    { key: 'D', text: q.option_d },
  ];

  return (
    <div style={{minHeight:'100vh',background:'#f5f6fa'}}>
      <nav style={{background:'white',padding:'12px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 1px 8px rgba(0,0,0,0.07)'}}>
        <button
          onClick={() => navigate('/topic/' + examName + '/' + subjectName)}
          style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer'}}>
          ←
        </button>
        <span style={{fontSize:'13px',fontWeight:'600',background:diffBg[difficulty],color:diffColors[difficulty],padding:'4px 12px',borderRadius:'99px'}}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
        <span style={{fontSize:'14px',fontWeight:'600',color: timer <= 10 ? '#cc0000' : '#555'}}>
          ⏱ {timer}s
        </span>
      </nav>

      <div style={{maxWidth:'680px',margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
          <span style={{fontSize:'13px',color:'#888'}}>Question {current + 1} of {questions.length}</span>
          <span style={{fontSize:'13px',color:'#888'}}>Score: {score}</span>
        </div>

        <div style={{background:'white',borderRadius:'16px',padding:'28px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'16px'}}>
          <p style={{fontSize:'17px',fontWeight:'500',color:'#1a1a2e',lineHeight:'1.6',margin:'0'}}>
            {q.question_text}
          </p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px'}}>
          {options.map((opt) => {
            let bg = 'white';
            let color = '#1a1a2e';
            let border = '1.5px solid #e0e0e0';
            if (selected) {
              if (opt.key === q.correct_answer) {
                bg = '#EAF3DE'; color = '#27500A'; border = '1.5px solid #7DB55A';
              } else if (opt.key === selected) {
                bg = '#FCEBEB'; color = '#791F1F'; border = '1.5px solid #E57373';
              }
            }
            return (
              <button key={opt.key}
                onClick={() => handleAnswer(opt.key)}
                style={{background:bg,color:color,border:border,borderRadius:'12px',padding:'14px 20px',textAlign:'left',fontSize:'14px',cursor:selected ? 'default' : 'pointer',display:'flex',gap:'12px',alignItems:'center',width:'100%'}}>
                <span style={{fontWeight:'700',minWidth:'24px'}}>{opt.key}.</span>
                {opt.text}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div style={{background:'#E6F1FB',borderRadius:'12px',padding:'16px',marginBottom:'16px',fontSize:'13px',color:'#0C447C',lineHeight:'1.6'}}>
            <strong>Explanation: </strong>{q.explanation}
          </div>
        )}

        {selected && (
          <button onClick={handleNext}
            style={{width:'100%',padding:'14px',background:'#2563eb',color:'white',border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:'600',cursor:'pointer'}}>
            {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPage;