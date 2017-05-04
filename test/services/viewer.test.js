const assert = require('assert');
const app = require('../../src/app');

describe('\'viewer\' service', () => {
  it('registered the service', () => {
    const service = app.service('viewer');

    assert.ok(service, 'Registered the service');
  });
});
