/**
 * Created by alejandro on 11/10/15.
 */

'use strict';

angular.module('sapoApp')
    .factory('Cloudinary', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var CLOUDINARY_URL = REST_API.CLOUDINARY_URL;

        return $resource(CLOUDINARY_URL , {  }, {
            upload              : { method: 'post',   isArray: false }
        })
    }]);
