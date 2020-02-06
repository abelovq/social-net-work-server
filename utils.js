const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

function setToken(data) {
  const payload = { id: data.id };
  const token = jwt.sign(payload, 'secret', {
    expiresIn: 86400 * 30,
  });
  return token;
}

// function getToken(headers) {
//   if (headers && headers.authorization) {
//     const token = headers.authorization.split(' ');
//     if (token.length === 2) {
//       console.log('parted TOKEN', token[1]);
//       return token[1];
//     }
//     return null;
//   }
//   return null;
// }

function handleValidation(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(422).send({ errors: errors.array() });
    return false;
  }
  return true;
}

module.exports = { setToken, handleValidation };
