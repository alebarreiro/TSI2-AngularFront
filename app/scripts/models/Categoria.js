/**
 * Created by alejandrobarreiro on 12/10/15.
 */
'use strict';

angular.module('sapoApp')
  .factory('Categoria', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    var API_REST_URL = REST_API.BASE_URL;

    return $resource(API_REST_URL + ':resource/:module/:id/:submodule', { id: '@id' }, {
      getCategoria          : { method: 'get', params: { resource: 'categorias' },                         isArray: false },
      getCategorias         : { method: 'get', params: { resource: 'categorias' },                         isArray: true },
      getProductosCategoria : { method: 'get', params: { resource: 'categorias', submodule: 'productos' }, isArray: true }
    })
  }]);