const { getToken } = require('../utils');

const getProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.user;
    res.status(200).send({ firstName, lastName, email });
  } catch (err) {
    console.log('err', err);
    res.status(400).send({ error: true, message: 'Something goes wrong...' });
  }
};

module.exports = { getProfile };
