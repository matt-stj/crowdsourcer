function Poll(id, title, choices, isActive) {
  this.id = id,
  this.title = title,
  this.choices = choices || {},
  // this.expiration = expiration ||,
  this.isActive = isActive || true
}

module.exports = Poll;
