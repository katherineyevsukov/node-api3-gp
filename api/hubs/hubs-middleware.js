const Hub = require('./hubs-model.js');
const yup = require('yup');

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

async function checkIdModern(req, res, next) {
  try {
    const possible = await Hub.findById(req.params.id)
    if (possible) {
      req.theHubFromTheDatabase = possible
      next()
    } else {
      // res.status(404).json({ message: 'not found' })
      next({ status: 404, message: 'not found!' })
    }
  } catch (err) {
    next(err)
  }
}

function validateHubOld(req, res, next) {
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

const hubSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('name needs to be a string')
    .trim('whitespace alone does not count')
    .required('you NEEED to supply name')
    .min(3, 'name needs to be 3 chars long')
    .max(100, 'name cannot be longer than 100')
})

async function validateHub(req, res, next) {
  try {
    const validated = await hubSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next()
  } catch (err) {
    next({ status: 422, message: err.message})
  }
}

module.exports = {
  handleError,
  checkHubId,
  validateHub,
}