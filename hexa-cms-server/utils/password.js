const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    username: user.username,
    createdAt: user.createdAt,
  };
}

module.exports = {
  hashPassword,
  sanitizeUser,
};
