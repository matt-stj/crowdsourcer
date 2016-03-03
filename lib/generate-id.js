const crypto = require('crypto');

module.exports = (digits) => {
  return crypto.randomBytes(digits).toString('hex');
};
