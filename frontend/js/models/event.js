angular
  .module('mymoments')
  .factory('Event', Event);

User.$inject = ['$resource'];

function Event($resource){

  return $resource(
    'http://localhost:3000/events/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
