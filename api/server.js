const express = require('express');
const helmet = require('helmet');   
const cors = require('cors');

//imports routers
const actionRouter = require('../data/helpers/actionRouter');
const projectRouter = require('../data/helpers/projectRouter');

const Projects = require('../data/helpers/projectModel');

const server = express();

server.get('/', (req, res) => {
    const message = process.env.MSG || 'Hello!';

    Projects.get()
    .then(projects => {
        res
        .status(200)
        .json({ message: message, projects });
    })
    .catch(err => {
        console.log('Could not retrieve projects.', err);
        res
        .status(500)
        .json({ message: 'Projects could not be retrieved.' });
    });
});

server.get('/', (req, res) => {
     

    res.send("<h2>And so it begins...<h2>", message );
});

//custom middleware
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`)

    next();
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;