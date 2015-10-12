/**
 * Created by alejandrobarreiro on 8/10/15.
 */
'use strict';

angular.module('sapoApp')
  .factory('Usuario', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    var API_REST_URL = REST_API.BASE_URL;

    return $resource(API_REST_URL + ':resource/:userid/:submodule/:op/:id', { id: '@id', userid: '@userid' }, {
      getUsuario           : { method: 'get',  params: { resource: 'usuarios' },                                         isArray: false },
      getMisAlmacenes      : { method: 'get',  params: { resource: 'usuarios', submodule: 'almacenes', op: 'list' },     isArray: true },
      actualizarPerfil     : { method: 'put',  params: { resource: 'usuarios' },                                         isArray: false },
      registrarUsuario     : { method: 'post', params: { resource: 'usuarios' },                                         isArray: false },
      agregarAlmacen       : { method: 'post', params: { resource: 'usuarios', submodule: 'almacenes', op: 'create' },   isArray: false },
    })
  }]);