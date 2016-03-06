const moment = require('moment');
const locus = require('locus')


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
  this.fullExpiration = this.expiration()
}

Poll.prototype.expiration = function () {
  if (this.expiresOn.toString().length > 12) {
    this.expiresOn = null
  }
  if (this.expiresAt && this.expiresOn) {
    var fullTime = this.expiresOn + ' ' + this.expiresAt
    var formattedFullTime = moment(fullTime).format('LLL')
    return this.fullExpiration = formattedFullTime
  }

  if (this.expiresOn && !this.expiresAt) {
    this.expiresAt = '11:59'
    var fullTime = this.expiresOn + ' ' + this.expiresAt
    var formattedFullTime = moment(fullTime).format('LLL')
    return this.fullExpiration = formattedFullTime
  }

  if (this.expiresAt && !this.expiresOn) {
    this.expiresOn = moment().format('LL')
    var fullTime = this.expiresOn + ' ' + this.expiresAt
    var formattedFullTime = moment(fullTime).format('LLL')
    return this.fullExpiration = formattedFullTime
  }
  // otherwise, this should return null - meaning there is no full expiration
};

module.exports = Poll;
