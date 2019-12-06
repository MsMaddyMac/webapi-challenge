const express = require('express');

const Projects = require('./projectModel');
const Actions = require('./actionModel');

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

module.exports = router;