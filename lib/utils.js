const _ = require('lodash');

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

const getId = function(data) {
  let response = null;

  if (_.isString(data)) { // basic string. maybe an iri
    response = getIdFromString(data);
  }

  if (response === null && _.isObject(data) && _.has(data, '@id')) { // object with an @id
    response = getIdFromString(data['@id']);
  }

  if (response === null && _.isObject(data) && _.has(data, 'id')) { // object with an id
    response = getIdFromString(data.id);
  }

  if (response === null && _.isArray(data)) {
    response = _.map(data, getId);
  }

  // everything else we cannot handle like arrays or objects without an id
  return response;
}

const getIri = function(data) {
  let response = null;

  if (_.isString(data)) { // basic string. maybe an iri
    response = getIriFromString(data);
  }

  if (response === null && _.isObject(data) && _.has(data, '@id')) { // object with an @id
    response = getIriFromString(data['@id']);
  }

  if (response === null && _.isObject(data) && _.has(data, 'id')) { // object with an id
    response = getIriFromString(data.id);
  }

  if (response === null && _.isArray(data)) {
    response = _.map(data, getIri);
  }

  // everything else we cannot handle like arrays or objects without an id
  return response;
}

module.exports = {
  getId,
  getIri
};
