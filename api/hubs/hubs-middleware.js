const Hub = require('./hubs-model.js');

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: 'something went really wrong!',
  })
}

function checkHubId(req, res, next) {
  Hub.findById(req.params.id)
    .then(possibleHub => {
      if (possibleHub) {
        req.theHubFromTheDatabase = possibleHub
        next()
      } else {
        // res.status(404).json({ message: 'not found' })
        next({ status: 404, message: 'not found!' })
      }
    })
    .catch(next)
}

function validateHub(req, res, next) {
  const { name } = req.body
  // this is pretty bad, you could use Yup
  if (
    name &&
    typeof name === 'string' &&
    name.length > 3 &&
    name.trim().length > 3 &&
    name.length < 100
  ) {
    next()
  } else {
    next({ status: 422, message: 'name bad' })
  }
}

module.exports = {
  handleError,
  checkHubId,
  validateHub,
}