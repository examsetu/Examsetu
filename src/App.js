import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExamPage from './pages/ExamPage';
import TopicPage from './pages/TopicPage';
import QuizPage from './pages/QuizPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/exam/:examName" element={<ProtectedRoute><ExamPage /></ProtectedRoute>} />
          <Route path="/topic/:examName/:subjectName" element={<ProtectedRoute><TopicPage /></ProtectedRoute>} />
          <Route path="/quiz/:examName/:subjectName/:topicName/:difficulty" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;