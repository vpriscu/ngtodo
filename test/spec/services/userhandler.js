'use strict';

describe('Service: userHandler', function () {

  // load the service's module
  beforeEach(module('ngtodoApp'));

  // instantiate service
  var userHandler;
  beforeEach(inject(function (_userHandler_) {
    userHandler = _userHandler_;
  }));

  it('should do something', function () {
    expect(!!userHandler).toBe(true);
  });

});
