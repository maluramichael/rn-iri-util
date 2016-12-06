# Iri Util #

Provide dead simple methods which try to get the id or iri for you.

### How do I get set up? ###

```javascript
import { getId, getIri } from 'iri-util';

var id = getId('/api/users/1234'); // id = '1234';
var iri = getIri('/api/users/1234'); // iri = '/api/users=1234';

// ...

id = getId({id: '/api/users/1234'}); // id = '1234';
iri = getIri({id: '/api/users/1234'}); // iri = '/api/users=1234';

```

### Contribution guidelines ###

* Writing tests (Running the tests: ```npm start``` in the root directory of the project)
* Create PRs
* Do not just change the code style

### Who do I talk to? ###

* michael.malura@socialbit.de
