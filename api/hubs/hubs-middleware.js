
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
        req.hub = possibleHub
        next()
      } else {
        // res.status(404).json({ message: 'not found' })
        next({ status: 404, message: 'not found!' })
      }
    })
    .catch(next)
}

module.exports = {
  handleError,
  checkHubId,
}