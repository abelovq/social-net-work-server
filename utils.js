const jwt = require('jsonwebtoken');

function setToken(data) {
  console.log('TOKEN data', data);
  const payload = { id: data.id };
  const token = jwt.sign(payload, 'secret', {
    expiresIn: 86400 * 30,
  });
  console.log('token', token);
  return token;
}

function getToken(headers) {
  if (headers && headers.authorization) {
    const token = headers.authorization.split(' ');
    if (token.length === 2) {
      console.log('parted TOKEN', token[1]);
      return token[1];
    }
    return null;
  }
  return null;
}

module.exports = { setToken, getToken };
