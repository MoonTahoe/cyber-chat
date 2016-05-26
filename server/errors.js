const notFoundError = (req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
}

const errorResponse = (err, req, res) => {
    res.status(err.status || 500)
    res.json('error', {
        message: err.message,
        error: err
    })
}

module.exports = {errorResponse, notFoundError}
