const _ = require('lodash');

const propertiesToCheck = ['@id', 'id'];

const getIdFromString = function(string) {
  var copy = string;

  var start = 0;
  var end = copy.length;

  var questionMarkIndex = copy.indexOf('?');
  if (questionMarkIndex !== -1) {
    end = questionMarkIndex;
  }

  copy = copy.substring(start, end);

  var slashIndex = copy.lastIndexOf('/');

  /*
    A slash is found
  */
  if (slashIndex !== -1) {

    /*
      Slash is the last character so we get search for the next slash
    */
    if (slashIndex === copy.length - 1) {
      copy = copy.substring(0, copy.length - 1);
      slashIndex = copy.lastIndexOf('/')
    }

    start = slashIndex + 1;
  }

  return copy.substring(start);
}

const getIriFromString = function(string) {
  var copy = string;

  var start = 0;
  var end = copy.length;

  var questionMarkIndex = copy.indexOf('?');
  if (questionMarkIndex !== -1) {
    end = questionMarkIndex;
  }

  copy = copy.substring(start, end);

  var slashIndex = copy.lastIndexOf('/');

  /*
    A slash is found
  */
  if (slashIndex !== -1) {

    /*
      Slash is the last character so we remove it
    */
    if (slashIndex === copy.length - 1) {
      copy = copy.substring(0, copy.length - 1);
    }

  }

  return copy.substring(start);
}

const getFirstProperty = function(data) {
  if (_.isArray(data) || !_.isObject(data)) return null;

  const keys = _.map(_.keys(data), String.toLowerCase);
  const properties = _.intersection(keys, propertiesToCheck);

  return _.head(properties);
}

const getId = function(data) {
  if (_.isString(data)) { // basic string. maybe an iri
    return getIdFromString(data);
  }

  const property = getFirstProperty(data);
  if (property) {
    return getIdFromString(data[property]);
  }

  if (_.isArray(data)) {
    return _.map(data, getId);
  }

  // everything else we cannot handle
  return null;
}

const getIri = function(data) {
  if (_.isString(data)) { // basic string. maybe an iri
    return getIriFromString(data);
  }

  const property = getFirstProperty(data);
  if (property) {
    return getIriFromString(data[property]);
  }

  if (_.isArray(data)) {
    return _.map(data, getIri);
  }

  // everything else we cannot handle
  return null;
}

module.exports = {
  getId,
  getIri
};
