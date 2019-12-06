const express = require('express');
const helmet = require('helmet');   

//imports routers
const actionRouter = require('../data/helpers/actionRouter');
const projectRouter = require('../data/helpers/projectRouter');

const server = express();

server.get('/', (req, res) => {
    const message = process.env.MSG || 'Hello!'; 

    res.send("<h2>And so it begins...<h2>", message );
});

//custom middleware
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`)

    next();
};

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;