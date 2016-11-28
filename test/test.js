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
}

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
      expect(id).to.equal(null);
    });
    it("[{}, {}, {}]", function() {
      const id = utils.getId([{}, {}, {}]);
      expect(id).to.equal(null);
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
      expect(iri).to.equal(null);
    });
    it("[{}, {}, {}]", function() {
      const iri = utils.getIri([{}, {}, {}]);
      expect(iri).to.equal(null);
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
});
