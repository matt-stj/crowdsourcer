function Poll(id, title, question, choices, isActive) {
  this.id = id,
  this.title = title,
  this.question = question
  this.choices = choices || {},
  // this.expiration = expiration ||,
  this.isActive = isActive || true
}

module.exports = Poll;
