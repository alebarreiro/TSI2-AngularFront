/**
 * Created by alejandrobarreiro on 6/11/15.
 */
angular.module('sapoApp')
  .factory('Reporte', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    var API_REST_URL = REST_API.BASE_URL;

    return $resource(API_REST_URL + ':resource/:subresource/:userid/:submodule/:op', { userid: '@userid' }, {
      getReporteValorizacion     : { method: 'get',  params: { resource: 'reportes', submodule: 'valorizaciones' },           isArray: false },
      getReporteMovimientos      : { method: 'get',  params: { resource: 'reportes', subresource: 'movimientos' },     isArray: false  },
    })
  }]);