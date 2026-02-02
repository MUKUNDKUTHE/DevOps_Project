import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('signupRole');
    navigate('/login');
  };

  return (
    <nav>
      <h2>ProjectBridge</h2>
      <div>
        {isLoggedIn && <Link to='/home'>Home</Link>}
        {isLoggedIn && role === 'college' && <Link to='/college'>College</Link>}
        {isLoggedIn && role === 'company' && <Link to='/company'>Company</Link>}
        {isLoggedIn && <Link to='/projects'>Projects</Link>}
        {!isLoggedIn && <Link to='/login'>Login</Link>}
        {!isLoggedIn && <Link to='/signup'>Sign Up</Link>}
        {isLoggedIn && <button onClick={handleLogout} style={{marginLeft:12,padding:'6px 16px',borderRadius:8,background:'#dc3545',color:'#fff',fontWeight:600,border:'none',cursor:'pointer'}}>Logout</button>}
      </div>
    </nav>
  );
}
