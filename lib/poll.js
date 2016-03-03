function Poll(id, adminKey, title, question, choices, isActive) {
  this.id = id,
  this.adminKey = adminKey || null,
  this.title = title,
  this.question = question
  this.choices = choices || {},
  // this.expiration = expiration ||,
  this.isActive = isActive || true
}

module.exports = Poll;
