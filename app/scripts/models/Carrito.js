/**
 * Created by alejandro on 11/9/15.
 */

'use strict';

angular.module('sapoApp')
    .factory('Carrito', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var API_REST_URL = REST_API.BASE_URL;

        return $resource(API_REST_URL + ':resource/:id/:submodule/:subresource/:prod', { id: '@id', prod: '@prod' }, {
            getCarrito           : { method: 'get',     params: { resource: 'carritos' },                         isArray: true },
            agregarCarrito       : { method: 'post',    params: { resource: 'carritos', submodule: 'agregar' },                         isArray: true },
            borrarCarrito        : { method: 'delete',  params: { resource: 'carritos', submodule: 'delete' },                         isArray: true }

        })
    }]);
