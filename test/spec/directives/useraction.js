'use strict';

describe('Directive: userAction', function () {

  // load the directive's module
  beforeEach(module('ngtodoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-action></user-action>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the userAction directive');
  }));
});
