import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p><b>Domain:</b> {project.domain}</p>
      <p><b>Skills:</b> {project.skills}</p>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectCard;
