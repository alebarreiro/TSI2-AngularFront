/**
 * Created by alejandrobarreiro on 8/10/15.
 */
'use strict';

angular.module('sapoApp')
  .factory('Cuenta', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    var API_REST_URL = REST_API.BASE_URL;

    return $resource(API_REST_URL + ':resource/:subresource/:userid/:id', { userid: '@userid', id: '@id' }, {
      getCuentas              : { method: 'get',  params: { resource: 'cuentas' },                           isArray: true  },
      crearCuenta             : { method: 'post', params: { resource: 'cuentas', subresource: 'create' },    sArray: false  },
      actualizarCuenta        : { method: 'put',  params: { resource: 'cuentas', subresource: 'update' },    isArray: false },
      actualizarCuentaUsuario : { method: 'put',  params: { resource: 'cuentas', subresource: 'update' },    isArray: false },
      getCuentaUsuario        : { method: 'get',  params: { resource: 'cuentas'},                            isArray: false },
    })
  }]);