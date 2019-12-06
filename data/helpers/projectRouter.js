const express = require('express');

const Projects = require('./projectModel');
const Actions = require('./actionModel');

const { 
        validateProjectId, 
        validateProject, 
        validateAction } 
    = require('../../validators/validators');

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

// DELETE request to delete project by specified ID
router.delete('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;

    Projects.get(id)
    .then(deletedProject => {
        if (deletedProject) {
        Projects.remove(id, deletedProject)
        .then(() => {
        res.status(200).json({ message: 'The project is history!', deletedProject });
        })
        .catch(err => {
            console.log('Error deleting project.', err);
            res.status(500).json({ error: 'Could not nuke project!' });
        })
    } 
    }) 
});

// PUT request to update project by specified ID
router.put('/:id', validateProjectId, (req, res) => {
    const updates = req.body;
    const id = req.params.id;

    Projects.get(id)
    .then(update => {
        if (Object.keys(updates).length === 0) {
            res.status(400).json({ errorMessage: 'Changed your mind? There is no update.' })
        } else {
            Projects.update(id, updates)
            .then(updatedProject => {
                res.status(200).json({ message: `Successfully updated!`, updatedProject });
            })
        }
    })
    .catch(err => {
        console.log('error updating project.', err);
        res.status(500).json({ error: 'The project could not be updated.' })
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
});

// creates a POST requst to add new action to project with specified ID
router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
    const actionData = { ...req.body, project_id: req.params.id };

    Actions.insert(actionData) 
    .then(action => {
        res.status(201).json(action);
    })
    .catch(err => {
        console.log('Error adding new action.', err);
        res.status(500).json({ message: 'Error adding new action for project.' });
    })
});

module.exports = router;