/**
 * Created by alejandrobarreiro on 8/10/15.
 */
'use strict';

angular.module('sapoApp')
  .factory('Producto', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    var API_REST_URL = REST_API.BASE_URL;

    return $resource(API_REST_URL + ':resource/:subresource/:userid/:submodule/:op/:id', { id: '@id' }, {
      getProducto          : { method: 'get',   params: { resource: 'producto' },                                         isArray: false },
      getProductos         : { method: 'get',   params: { resource: 'producto', submodule: 'almacenes', op: 'list' },     isArray: true  },
      createProducto       : { method: 'post',  params: { resource: 'productos', submodule: 'create' },                   isArray: false },
      addTags              : { method: 'post',  params: { resource: 'productos', submodule: 'tags', op: 'create'},        isArray: true  },
      addImg               : { method: 'post',  params: { resource: 'imagenes', subresource: 'upload'   },                isArray: true  }
    })
  }]);