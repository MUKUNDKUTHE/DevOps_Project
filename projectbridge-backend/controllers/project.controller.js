import Project from "../models/Project.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { title, domain, skills, description } = req.body;
    
    // Validate required fields
    if (!title || !domain || !skills || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PROJECT ✅
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
