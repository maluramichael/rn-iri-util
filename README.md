# Hydra Transformer #

Hydra isn't that neat to use inside an js application.
You always have to call properties through the [] operator because all hydra properties have a @ prefix.

This transformer sanitize the hydra response.

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

* Writing tests
* Create PRs
* Do not just change the code style

### Who do I talk to? ###

* michael.malura@socialbit.de
