const { isValidObjectId } = require('mongoose');

exports.isValidObjectId = function (id) {
    if(typeof id === "number") return false
    return isValidObjectId(id)
}

exports.checkValidString = function (value) {
  if (typeof value === 'undefined' || value === null || typeof value === 'number') return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}