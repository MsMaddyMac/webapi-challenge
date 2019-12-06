const express = require('express');

const Projects = require('./projectModel');
const Actions = require('./actionModel');

const { validateProjectId, validateProject } = require('../../validators/validators');

const router = express.Router();

// GET request to retrieve a list of projects on database
router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res
        .status(200)
        .json(projects);
    })
    .catch(err => {
        console.log('Trouble retrieving projects.', err);
        res
        .status(500)
        .json({ message: 'Error retrieving projects.' });
    });
});

// GET request to retrieve project by ID
router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if(project) {
            res
            .status(200)
            .json(project);
        }
    })
});

// POST request to create a new project
router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        console.log('Error adding new project.', err);
        res.status(500).json({ error: 'Error adding new project.' });
    })
});

//***SUB ROUTES***
  // GET request to retrieve actions for a specific project
  router.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id;

    Projects.getProjectActions(id)
    .then(actions => {
        if (actions.length === 0) {
            res.status(400).json({ errorMessage: 'No actions found.' });
        } else {
            res.status(200).json(actions);
        }
    })
    .catch(err => {
        console.log('Actions could not be retrieved.', err);
        res
        .status(500)
        .json({ error: 'No actions found.' });
    })
})

module.exports = router;