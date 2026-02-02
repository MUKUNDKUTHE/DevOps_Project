import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('college');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:50000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('signupRole', role);
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f6f8fa'}}>
      <form onSubmit={handleSubmit} className="card" style={{maxWidth:400,width:'100%',padding:'2.5rem 2rem',boxShadow:'0 4px 24px #0001',borderRadius:16,background:'#fff',display:'flex',flexDirection:'column',gap:18}}>
        <div style={{textAlign:'center',marginBottom:10}}>
          <span style={{fontSize:48,display:'inline-block',marginBottom:8}}>📝</span>
          <h2 style={{margin:0,fontWeight:700}}>Sign Up</h2>
          <p style={{color:'#888',margin:'6px 0 0'}}>Create your ProjectBridge account</p>
        </div>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{padding:12,borderRadius:8,border:'1px solid #ddd',fontSize:16}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required style={{padding:12,borderRadius:8,border:'1px solid #ddd',fontSize:16}} />
        <select value={role} onChange={e=>setRole(e.target.value)} style={{padding:12,borderRadius:8,border:'1px solid #ddd',fontSize:16}}>
          <option value="college">College</option>
          <option value="company">Company</option>
        </select>
        <button type="submit" style={{padding:12,borderRadius:8,background:'#007bff',color:'#fff',fontWeight:600,fontSize:16,border:'none',marginTop:8}}>Sign Up</button>
        {error && <p style={{color:'red',margin:0}}>{error}</p>}
        <div style={{textAlign:'center',marginTop:10}}>
          <span style={{color:'#888'}}>Already have an account? </span>
          <Link to="/login" style={{color:'#007bff',fontWeight:500}}>Login</Link>
        </div>
      </form>
    </div>
  );
}
