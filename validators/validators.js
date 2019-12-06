// custom validator middleware
const Projects = require('../data/helpers/projectModel');

module.exports = {
    validateProjectId,
    validateProject
}

//to be used on every GET request that expects a project id parameter.
function validateProjectId(req, res, next) {
    const id = req.params.id;
    
    Projects.get(id)
      .then(project => {
        if (project) {
          req.project = project;
        } else {
          res
            .status(400)
            .json({ message: 'invalid project ID.' });
        }
      })
    next();
  };

  // validates the body on a POST request to create a new project
function validateProject(req, res, next) {
    const projectData = req.body;
    const { name, description } = projectData;

    if (Object.keys(projectData).length === 0) {
        res.status(400).json({ message: 'Project data is required.' });
    }
    if (!name || !description) {
        res.status(400).json({ message: 'Missing required name and/or description field.' });
    } else {
        next();
    }
};
  