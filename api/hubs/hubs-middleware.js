function handleError(err, req, res, next){
    res.status(500 || err.status).json({
        message: err.message, 
        prodMessage: 'something went really wrong!'
    })
}

module.exports = {
    handleError,
}