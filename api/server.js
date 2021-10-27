const express = require('express'); // importing a CommonJS module
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());

server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

// server.use(customMiddleware); // custom middleware being used

// we can plug custom middlewares to a particular router only
server.use('/api/hubs', customMiddleware, customMiddleware, hubsRouter);

server.get('/', customMiddleware, (req, res) => {
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
  if (req.query.short == 'circuit') {
    res.json('short circuited!')
  } else {
    next() // the req and res can proceed to the next middleware
  }
}