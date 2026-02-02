import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:50000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        navigate('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f6f8fa'}}>
      <form onSubmit={handleSubmit} className="card" style={{maxWidth:400,width:'100%',padding:'2.5rem 2rem',boxShadow:'0 4px 24px #0001',borderRadius:16,background:'#fff',display:'flex',flexDirection:'column',gap:18}}>
        <div style={{textAlign:'center',marginBottom:10}}>
          <span style={{fontSize:48,display:'inline-block',marginBottom:8}}>🔐</span>
          <h2 style={{margin:0,fontWeight:700}}>Sign In</h2>
          <p style={{color:'#888',margin:'6px 0 0'}}>Welcome back! Please login to your account.</p>
        </div>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{padding:12,borderRadius:8,border:'1px solid #ddd',fontSize:16}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required style={{padding:12,borderRadius:8,border:'1px solid #ddd',fontSize:16}} />
        <button type="submit" style={{padding:12,borderRadius:8,background:'#007bff',color:'#fff',fontWeight:600,fontSize:16,border:'none',marginTop:8}}>Login</button>
        {error && <p style={{color:'red',margin:0}}>{error}</p>}
        <div style={{textAlign:'center',marginTop:10}}>
          <span style={{color:'#888'}}>Don't have an account? </span>
          <Link to="/signup" style={{color:'#007bff',fontWeight:500}}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
