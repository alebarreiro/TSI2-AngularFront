/**
 * Created by alejandrobarreiro on 8/10/15.
 */
'use strict';

angular.module('sapoApp')
  .factory('Notificacion', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    var API_REST_URL = REST_API.BASE_URL;

    return $resource(API_REST_URL + ':resource/:module/:id/:op/:subop/:userid', { id: '@id', userid: '@userid' }, {
      getNotificacionesStock             : { method: 'get',  params: { resource: 'notificaciones' },         isArray: true },
      getNotificacionesLimiteCuenta      : { method: 'get',  params: { resource: 'notificaciones', op: 'limitecuenta' },  isArray: true },
    })
  }]);