function Poll(id, adminKey, title, question, choices,
                     expiration, isPrivate, isActive) {

  this.id = id,
  this.adminKey = adminKey || null,
  this.title = title,
  this.question = question
  this.choices = choices || {},
  this.expiration = expiration || null,
  this.isPrivate = isPrivate || false,
  this.isActive = isActive || true
}

module.exports = Poll;
