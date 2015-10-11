/**
 * Created by alejandrobarreiro on 8/10/15.
 */
'use strict';

angular.module('sapoApp')
  .factory('Template', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    var API_REST_URL = REST_API.BASE_URL;

    return $resource(API_REST_URL + ':resource/:module/:submodule/:id', { id: '@id' }, {
      getTemplate        : { method: 'get', params: { resource: 'templates' },  isArray: false },
      getTemplates       : { method: 'get', params: { resource: 'templates' },  isArray: true },
    })
  }]);