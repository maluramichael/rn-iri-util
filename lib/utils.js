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

  for( var prop of propertiesToCheck ) {
    if (keys.indexOf(prop) !== -1) return prop;
  }

  return null;
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

const isApi = function(iri, api) {
  if (iri && api && api.length > 0) {
    return _.includes(iri, api);
  } else {
    return false;
  }
};

const isEitherApi = function (iri, apis) {
  if (iri && apis && apis.length > 0) {
    for (var counter = 0; counter < apis.length; counter++) {
      if (isApi(iri, apis[counter])) {
        return true;
      }
    }
  }
  return false;
}

module.exports = {
  getId,
  getIri,
  isApi,
  isEitherApi
};
