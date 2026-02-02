import React, { useEffect, useState } from 'react';

function ProjectCard({ project }) {
  return (
    <div className='card' style={{boxShadow:'0 2px 12px #0001',borderRadius:14,padding:'1.5rem 1.2rem',background:'#fff',transition:'box-shadow .2s',display:'flex',flexDirection:'column',gap:10}}>
      <h3 style={{margin:'0 0 6px',fontWeight:600}}>{project.title}</h3>
      <p style={{margin:'0 0 2px',color:'#007bff'}}><b>Domain:</b> {project.domain}</p>
      <p style={{margin:'0 0 2px',color:'#555'}}><b>Skills:</b> {project.skills}</p>
      <p style={{margin:'0 0 8px',color:'#444'}}>{project.description}</p>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await fetch('http://127.0.0.1:50000/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className='section' style={{background:'#f6f8fa',minHeight:'100vh',padding:'40px 0'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <h2 style={{textAlign:'center',fontWeight:700,marginBottom:32}}>Available Projects</h2>

        <div className='grid' style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:28,marginTop:24}}>
          {projects.map(p => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
