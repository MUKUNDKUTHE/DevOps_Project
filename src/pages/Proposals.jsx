import { useEffect, useState } from 'react';

export default function Proposals() {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');

  const fetchProposals = async () => {
    try {
      const res = await fetch('http://127.0.0.1:50000/api/proposals');
      const data = await res.json();
      setProposals(data);
    } catch {
      setError('Failed to fetch proposals');
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className='section'>
      <h2>Proposals</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <div className='grid'>
        {proposals.map(p => (
          <div className='card' key={p._id}>
            <h3>Project: {p.projectId}</h3>
            <p><b>Company:</b> {p.companyId}</p>
            <p><b>Message:</b> {p.message}</p>
            <p><b>Status:</b> {p.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
