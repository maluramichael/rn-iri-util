const assert = require('assert');
const _ = require('lodash');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const utils = require('../lib/utils.js');

const data = {
  "@context": "/api/contexts/User",
  "@id": "/api/users",
  "@search": "xyz",
  "@type": "Users",
  "hydra:member": [
    {
      "@context": "/api/contexts/User",
      "@id": "/api/users/4fc62821-ab4b-11e6-b176-0258ac71fd57",
      "@type": "User",
      "birthdate": "1993-01-03T00:00:00+00:00",
      "city": null,
      "country": null,
      "displayName": "Thomas Kekeisen",
      "email": "thomas.kekeisen@socialbit.de",
      "enabled": true,
      "firstName": "Thomas",
      "fullName": "Thomas Kekeisen",
      "houseNumber": null,
      "language": "de",
      "lastName": "Kekeisen",
      "salt": null,
      "street": null,
      "username": "thomas.kekeisen",
      "zipCode": null
    }, {
      "@context": "/api/contexts/User",
      "@id": "/api/users/f02b7cf7-acc2-11e6-b176-0258ac71fd57",
      "@type": "User",
      "birthdate": null,
      "city": "Konstanz",
      "country": "Deutschland",
      "displayName": "Adel Grimm",
      "email": null,
      "enabled": true,
      "firstName": "Adel",
      "fullName": "Adel Grimm",
      "houseNumber": null,
      "language": "en",
      "lastName": "Grimm",
      "salt": null,
      "street": "Zur Laube 5",
      "username": null,
      "zipCode": 78462
    }
  ],
  "hydra:totalItems": 2
};

describe('Id utils', function() {
  describe('Basic arguments', function() {
    it("{}", function() {
      const id = utils.getId({});
      expect(id).to.equal(null);
    });

    it("null", function() {
      const id = utils.getId(null);
      expect(id).to.equal(null);
    });

    it("[null, null, null]", function() {
      const id = utils.getId([null, null, null]);
      expect(id).to.deep.equal([null, null, null]);
    });

    it("[{}, {}, {}]", function() {
      const id = utils.getId([null, null, null]);
      expect(id).to.deep.equal([null, null, null]);
    });
  });

  describe('Parse string', function() {
    it('/api/users/12345', function() {
      const id = utils.getId('/api/users/12345');
      id.should.be.equal('12345');
    });

    it('/api/users/12345/', function() {
      const id = utils.getId('/api/users/12345/');
      id.should.be.equal('12345');
    });

    it('/api/users/12345?seed=0&param1=true', function() {
      const id = utils.getId('/api/users/12345?seed=0&param1=true');
      id.should.be.equal('12345');
    });

    it('/api/users/12345/?seed=0&param1=true', function() {
      const id = utils.getId('/api/users/12345/?seed=0&param1=true');
      id.should.be.equal('12345');
    });
  });

  describe('Parse object', function() {
    it("{id: '/api/users/12345'}", function() {
      const id = utils.getId({id: '/api/users/12345'});
      id.should.be.equal('12345');
    });

    it("{@id: '/api/users/12345', id: '/api/users/6789'}", function() {
      const id = utils.getId({id: '/api/users/12345'});
      id.should.be.equal('12345');
    });

    it("{id: '/api/users/12345/'}", function() {
      const id = utils.getId({id: '/api/users/12345/'});
      id.should.be.equal('12345');
    });

    it("{id: '/api/users/12345?seed=0&param1=true'}", function() {
      const id = utils.getId({id: '/api/users/12345?seed=0&param1=true'});
      id.should.be.equal('12345');
    });

    it("{id: '/api/users/12345/?seed=0&param1=true'}", function() {
      const id = utils.getId({id: '/api/users/12345/?seed=0&param1=true'});
      id.should.be.equal('12345');
    });
  });

  describe('Parse array', function() {
    it("[{id: '/api/users/12345'}]", function() {
      const id = utils.getId([{id: '/api/users/12345'}]);
      id.should.be.deep.equal(['12345']);
    });
  });
});

describe('Iri utils', function() {
  describe('Basic arguments', function() {
    it("{}", function() {
      const iri = utils.getIri({});
      expect(iri).to.equal(null);
    });

    it("null", function() {
      const iri = utils.getIri(null);
      expect(iri).to.equal(null);
    });

    it("[null, null, null]", function() {
      const iri = utils.getIri([null, null, null]);
      expect(iri).to.deep.equal([null, null, null]);
    });

    it("[{}, {}, {}]", function() {
      const iri = utils.getIri([{}, {}, {}]);
      expect(iri).to.deep.equal([null, null, null]);
    });
  });

  describe('Parse string', function() {
    it('/api/users/12345', function() {
      const iri = utils.getIri('/api/users/12345');
      iri.should.be.equal('/api/users/12345');
    });

    it('/api/users/12345/', function() {
      const iri = utils.getIri('/api/users/12345/');
      iri.should.be.equal('/api/users/12345');
    });

    it('/api/users/12345?seed=0&param1=true', function() {
      const iri = utils.getIri('/api/users/12345?seed=0&param1=true');
      iri.should.be.equal('/api/users/12345');
    });

    it('/api/users/12345/?seed=0&param1=true', function() {
      const iri = utils.getIri('/api/users/12345/?seed=0&param1=true');
      iri.should.be.equal('/api/users/12345');
    });
  });

  describe('Parse object', function() {
    it("{id: '/api/users/12345'}", function() {
      const iri = utils.getIri({id: '/api/users/12345'});
      iri.should.be.equal('/api/users/12345');
    });

    it("{@id: '/api/users/12345', id: '/api/users/6789'}", function() {
      const id = utils.getIri({id: '/api/users/12345'});
      id.should.be.equal('/api/users/12345');
    });

    it("{id: '/api/users/12345/'}", function() {
      const iri = utils.getIri({id: '/api/users/12345'});
      iri.should.be.equal('/api/users/12345');
    });

    it("{id: '/api/users/12345?seed=0&param1=true'}", function() {
      const iri = utils.getIri({id: '/api/users/12345?seed=0&param1=true'});
      iri.should.be.equal('/api/users/12345');
    });

    it("{id: '/api/users/12345/?seed=0&param1=true'}", function() {
      const iri = utils.getIri({id: '/api/users/12345/?seed=0&param1=true'});
      iri.should.be.equal('/api/users/12345');
    });
  });

  describe('Parse array', function() {
    it("[{id: '/api/users/12345'}]", function() {
      const id = utils.getIri([{id: '/api/users/12345'}]);
      id.should.be.deep.equal(['/api/users/12345']);
    });
  });

  describe('Is Api', function () {
    const iriString = '/api/campsites/1';

    it('Should return false if "api" is empty object', function () {
      const isApi = utils.isApi(iriString, {});
      isApi.should.be.equal(false);
    });

    it('Should return true if "campsites" is part of "' + iriString + '"', function () {
      const isApi = utils.isApi(iriString, 'campsites');
      isApi.should.be.equal(true);
    });

    it('Should return false if "api" is an array containing "null" only', function () {
      const isApi = utils.isApi(iriString, [null, null]);
      isApi.should.be.equal(false);
    });

    it('Should return false if "api" is an empty array', function () {
      const isApi = utils.isApi(iriString, []);
      isApi.should.be.equal(false);
    });

    it('Should return false if "5" is not a part of the iri', function () {
      const isApi = utils.isApi(iriString, 5);
      isApi.should.be.equal(false);
    });

    it('Should return false if "iri" is given and other arguments are "null": isApi(' + iriString + ', null, null)', function () {
      const isApi = utils.isApi(iriString, null, null);
      isApi.should.be.equal(false);
    });

    it('Should return false if only "iri" is given', function () {
      const isApi = utils.isApi(iriString);
      isApi.should.be.equal(false);
    });

    it('Should return false if "api" is null', function () {
      const isApi = utils.isApi(iriString, null);
      isApi.should.be.equal(false);
    });

    it('Should return false if both arguments are null', function () {
      const isApi = utils.isApi(null, null);
      isApi.should.be.equal(false);
    });
  });

  describe('Is either Api', function() {
    const iriString = '/api/campsites/1';

    it('Should return true if "venue", "parking_space" or "campsite" is a part of "https://api.camigo.info/api/venue"', function () {
      const iriString = 'https://api.camigo.info/api/venue';
      const isEitherApi1 = utils.isEitherApi(iriString, ['venue', 'parking_space', 'campsite']);
      const isEitherApi2 = utils.isEitherApi(iriString, ['venue', 'campsite', 'parking_space']);
      const isEitherApi3 = utils.isEitherApi(iriString, ['campsite', 'parking_space', 'venue']);
      isEitherApi1.should.be.equal(true);
      isEitherApi2.should.be.equal(true);
      isEitherApi3.should.be.equal(true);
    });

    it('Should return true if "venue", "parking_space" or "campsite" is a part of "https://api.camigo.info/api/parking_space"', function () {
      const iriString = 'https://api.camigo.info/api/parking_space';
      const isEitherApi1 = utils.isEitherApi(iriString, ['venue', 'parking_space', 'campsite']);
      const isEitherApi2 = utils.isEitherApi(iriString, ['venue', 'campsite', 'parking_space']);
      const isEitherApi3 = utils.isEitherApi(iriString, ['campsite', 'parking_space', 'venue']);
      isEitherApi1.should.be.equal(true);
      isEitherApi2.should.be.equal(true);
      isEitherApi3.should.be.equal(true);
    });

    it('Should return true if "venue", "parking_space" or "campsite" is a part of "https://api.camigo.info/api/campsite"', function () {
      const iriString = 'https://api.camigo.info/api/campsite';
      const isEitherApi1 = utils.isEitherApi(iriString, ['venue', 'parking_space', 'campsite']);
      const isEitherApi2 = utils.isEitherApi(iriString, ['venue', 'campsite', 'parking_space']);
      const isEitherApi3 = utils.isEitherApi(iriString, ['campsite', 'parking_space', 'venue']);
      isEitherApi1.should.be.equal(true);
      isEitherApi2.should.be.equal(true);
      isEitherApi3.should.be.equal(true);
    });

    it('Should return false if "apis" is empty object', function () {
      const isEitherApi = utils.isEitherApi(iriString, {});
      isEitherApi.should.be.equal(false);
    });

    it('Should return false if "apis" is "null"', function () {
      const isEitherApi = utils.isEitherApi(iriString, null);
      isEitherApi.should.be.equal(false);
    });

    it('Should return false if "apis" contains "null" only', function () {
      const isEitherApi = utils.isEitherApi(iriString, [null, null]);
      isEitherApi.should.be.equal(false);
    });

    it('Should return false if only "iri" is given', function () {
      const isEitherApi = utils.isEitherApi(iriString);
      isEitherApi.should.be.equal(false);
    });

    it('Should return false if "[1, 2, 3]" was entered for "apis"', function () {
      const isEitherApi = utils.isEitherApi(iriString, [1, 2, 3]);
      isEitherApi.should.be.equal(false);
    });

    it('Should return true if "venues" or "campsites" is a part of "' + iriString + '"', function () {
      const isEitherApi = utils.isEitherApi(iriString, ['campsites', 'venues']);
      isEitherApi.should.be.equal(true);
    });

    it('Should return true if one element in "["campsites", "venues", []]" is a part of "' + iriString + '"', function () {
      const isEitherApi = utils.isEitherApi(iriString, ['campsites', 'venues', []]);
      isEitherApi.should.be.equal(true);
    });

    it('Should return true if one element in "["campsites", "venues", {}]" is a part of "' + iriString + '"', function () {
      const isEitherApi = utils.isEitherApi(iriString, ['campsites', 'venues', {}]);
      isEitherApi.should.be.equal(true);
    });

    it('Should return true if one element in "["campsites", "venues", null]" is a part of "' + iriString + '"', function () {
      const isEitherApi = utils.isEitherApi(iriString, ['campsites', 'venues', null]);
      isEitherApi.should.be.equal(true);
    });

    it('Should return false if "apis" is an empty object', function () {
      const isEitherApi = utils.isEitherApi(iriString, {});
      isEitherApi.should.be.equal(false);
    });
  })
});
