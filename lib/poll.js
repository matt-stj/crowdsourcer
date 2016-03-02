function Poll(id, results, expiration, isActive) {
  this.id = id,
  this.results = results,
  this.expiration = expiration,
  this.isActive = isActive
}

module.exports = Poll;
