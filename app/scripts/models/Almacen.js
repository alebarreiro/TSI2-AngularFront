/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .factory('Almacen', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    var API_REST_URL = REST_API.BASE_URL;

    return $resource(API_REST_URL + ':resource/:module/:submodule/:id', { id: '@id' }, {
      getAlmacen        : { method: 'get', params: { resource: 'almacenes' },  isArray: false },
      getAlmacenes      : { method: 'get', params: { resource: 'almacenes' },  isArray: true },
    })
  }]);