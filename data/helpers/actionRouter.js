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

// GET request to retrieve action by specified ID
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

// deletes action by specified ID
router.delete('/:id', validateActionId, (req, res) => {
    const id = req.params.id;

    Actions.get(id)
    .then(deletedAction => {
        if (deletedAction) {
            Actions.remove(id, deletedAction)
            .then(() => {
                res
                .status(200)
                .json({ message: 'The action is history!', deletedAction });
            })
        }
    })
    .catch(err => {
        console.log('Error deleting action.');
        res
        .status(500)
        .json({ error: 'Error deleting action.' })
    });
});

// PUT request to update action by specified id
router.put('/:id', validateActionId, (req, res) => {
    const updateInfo = req.body;
    const id = req.params.id;

    Actions.get(id)
    .then(() => {
        if (Object.keys(updateInfo).length === 0) {
            res
            .status(400)
            .json({ errorMessage: 'Changed your mind? There is nothing to update.' })
        } else {
            Actions.update(id, updateInfo)
            .then(updatedAction => {
                res
                .status(200)
                .json({ message: 'Successfully update!', updatedAction });
            })
        }
    })
    .catch(err => {
        console.log('error updating action.', err);
        res
        .status(500)
        .json({ error: 'The action could not be updated.' })
    });
});

module.exports = router;