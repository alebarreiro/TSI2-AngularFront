'use strict';

describe('Service: hola', function () {

  // load the service's module
  beforeEach(module('sbAdminApp'));

  // instantiate service
  var hola;
  beforeEach(inject(function (_hola_) {
    hola = _hola_;
  }));

  it('should do something', function () {
    expect(!!hola).toBe(true);
  });

});
