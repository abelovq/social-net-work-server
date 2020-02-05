const { getToken } = require('../utils');

const getProfile = async (req, res) => {
  try {
    const token = getToken(req.headers);
    console.log('token PROFILE', token);
    if (token) {
      const { firstName, lastName, email } = req.user;
      res.status(200).send({ firstName, lastName, email });
    } else {
      res
        .status(403)
        .json({ success: false, message: 'qw Unauthorized.' });
    }
  } catch (err) {
    console.log('err', err);
    res
      .status(400)
      .send({ error: true, message: 'Something goes wrong...' });
  }
};

module.exports = { getProfile };
