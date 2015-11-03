/**
 * Created by alejandro on 11/3/15.
 */
'use strict';

angular.module('sapoApp')
    .factory('Webscrap', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var API_REST_URL = REST_API.WEBSCRAP_URL;

        return $resource(API_REST_URL + ':resource/:module/:id/:op/', { }, {
            //Obtiene las categorías base de mercado libre.
            getCategorias           : { method: 'get',  params: { resource: 'mercadolibre', module: 'categorias' },   isArray: true },
            //Dada una categoría realiza una búsqueda de productos.
            searchCategoria         : { method: 'post', params: { resource: 'mercadolibre', module: 'search'},        isArray: false},
            //Agrega productos a la tienda, en este proceso se agrega a la base central de SAPO PostgreSQL y mongodb con los detalles del producto.
            addProductos            : { method: 'post', params: { resource: 'mercadolibre', module: 'addproductos'},        isArray: true}
        })
    }]);