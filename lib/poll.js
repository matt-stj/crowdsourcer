function Poll(id, adminKey, title, question, choices,
                     expiresOn, expiresAt, isPrivate, isActive) {

  this.id = id,
  this.adminKey = adminKey || null,
  this.title = title || null,
  this.question = question || null,
  this.choices = choices || {},
  this.expiresOn = expiresOn || Date.now(),
  this.expiresAt = expiresAt || null,
  this.isPrivate = isPrivate || false,
  this.isActive = isActive || true
}

Poll.prototype.expiration = function () {
  if (this.expiresAt && this.expiresOn) {
    // concat them both
  }

  if (this.expiresOn && !this.expiresAt) {
    // this.expiresOn = midnight
  }

  if (this.expiresAt && !this.expiresOn) {
    // this.expiresAt = today
  }
};

module.exports = Poll;
