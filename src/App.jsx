import {BrowserRouter,Routes,Route,Navigate,useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import College from './pages/College';
import Company from './pages/Company';
import Projects from './pages/Projects';
import Proposals from './pages/Proposals';
import Login from './pages/Login';
import Signup from './pages/Signup';

function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function RequireRole({ children, requiredRole }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/college" element={<RequireRole requiredRole="college"><College /></RequireRole>} />
        <Route path="/company" element={<RequireRole requiredRole="company"><Company /></RequireRole>} />
        <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
        <Route path="/proposals" element={<RequireAuth><Proposals /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}
