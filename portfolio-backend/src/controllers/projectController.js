import Project from "../models/Projects.js"

// GET all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error during getting projects list." });
  }
}

// POST new project
export const createProject = async (req, res) => {
  const {
    title,
    type,
    required,
    description,
    technologies,
    githubLink,
    liveDemoLink,
    image,
  } = req.body;

  const newProject = new Project({
    title,
    type,
    required,
    description,
    technologies,
    githubLink,
    liveDemoLink,
    image,
  })

  try {
    const addedProject = await newProject.save();
    res.status(200).json(addedProject);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Create project was failed.', error: error.message })
  }
}

// DELETE project by ID
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found.' });
    res.json({ message: "Project deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete project failed.' });
  }
}

// UPDATE project by ID
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateProject) res.status(404).json({ message: "Project is not existed." });
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update project failed." });
  }
}