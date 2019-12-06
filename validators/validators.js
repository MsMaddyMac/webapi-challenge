// custom validator middleware
const Projects = require('../data/helpers/projectModel');

module.exports = {
    validateProjectId
}

//to be used on every request that expects a project id parameter.
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