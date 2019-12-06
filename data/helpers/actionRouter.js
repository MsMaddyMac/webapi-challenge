const express = require('express');

const Actions = require('./actionModel');

const { validateActionId } = require('../../validators/validators');

const router = express.Router();

// GET request to retrieve all actions in database
router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        console.log('Could not retrieve actions.', err);
        res.status(500).json({ message: 'Actions could not be retrieved.' });
    });
});

router.get('/:id', validateActionId, (req, res) => {
    const id = req.params.id;

    Actions.get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        console.log('The action could not be retrieved.', err);
        res.status(500).json({ error: 'The action could not be retrieved.' })
    })
});

module.exports = router;