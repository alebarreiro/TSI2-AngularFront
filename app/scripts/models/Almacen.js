/**
 * Created by alejandrobarreiro on 8/10/15.
 */
'use strict';

angular.module('sapoApp')
  .factory('Almacen', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    var API_REST_URL = REST_API.BASE_URL;

    return $resource(API_REST_URL + ':resource/:module/:id/:op/:userid', { id: '@id', userid: '@userid' }, {
      getAlmacen          : { method: 'get',  params: { resource: 'almacenes' },                            isArray: false },
      getAlmacenes        : { method: 'get',  params: { resource: 'almacenes' },                            isArray: true },
      agregarCategorias   : { method: 'post', params: { resource: 'almacenes', op: 'agregarcategorias' },   isArray: true },
      agregarProductos    : { method: 'post', params: { resource: 'almacenes', op: 'agregarproductos'  },   isArray: true },
      agregarColaborador  : { method: 'post', params: { resource: 'almacenes', op: 'colaboradores'     },   isArray: false },
    })
  }]);