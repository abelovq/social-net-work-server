const jwt = require('jsonwebtoken');

function setToken(data) {
  console.log('TOKEN data', data);
  const token = jwt.sign(JSON.parse(JSON.stringify(data)), 'secret', {
    expiresIn: 86400 * 30,
  });
  console.log('token', token);
  jwt.verify(token, 'secret');
  return token;
}

function getToken(headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      console.log('parted TOKEN', parted[1]);
      return parted[1];
    }
    return null;
  }
  return null;
}

module.exports = { setToken, getToken };
