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

module.exports = router;