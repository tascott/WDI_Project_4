angular
  .module('myMoments')
  .factory('Event', Event);

Event.$inject = ['$resource', 'API'];
function Event($resource, API){

  return $resource(
    API+'/events/:id', {id: '@event._id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'update':    { method: 'PUT' }, 
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
