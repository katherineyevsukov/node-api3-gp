const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());

// server.use(customMiddleware); // custom middleware being used

server.use('/api/hubs', customMiddleware, customMiddleware, hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` })
});

module.exports = server;

function customMiddleware(req, res, next) { // custom middleware (declaring it)
  console.log('web 47 rocks!')
  next() // the req and res can proceed to the next middleware
}