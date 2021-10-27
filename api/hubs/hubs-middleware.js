function handleError(err, req, res, next) {
    res.status(500 || err.status).json({
      message: err.message,
      prodMessage: 'something went really wrong!',
    })
  }
  
  function checkHubId(req, res, next) {
    // hit the db with req.params.id
    // check if something comes back
    // if id is real, then next()
    // if id not there, then next({ status: 404, mess })
  }
  
  module.exports = {
    handleError,
    checkHubId,
  }