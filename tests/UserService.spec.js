describe('UserService', function () {

  beforeEach(module('app'))

  let UserService, $httpBackend
  let user = {first_name: 'Baz', last_name: 'Bonkers'}

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService')
    $httpBackend = $injector.get('$httpBackend')

    $httpBackend.when('GET', '/rest/user').respond(user)
  }))

  it('should join two names together with a space', function() {
    expect(UserService.createFullName(user)).toEqual('Baz Bonkers')
  })

  it('should get user from backend', function(done) {
    $httpBackend.expectGET('/rest/user')

    UserService
      .getUser()
      .then(function(response) {
        let data = response.data
        if (data.first_name === 'Baz' && data.last_name === 'Bonkers') {
          done()
        }
      })
    $httpBackend.flush()
  })

});
