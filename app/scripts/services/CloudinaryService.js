/**
 * Created by alejandro on 11/10/15.
 */

angular.module('sapoApp')
    .service('cloudinaryService', ['$q',  'Cloudinary', 'authService', 'REST_API', function ($q, Cloudinary, authService, REST_API) {

        this.init = function () {};

        this.upload = function(data) {
            var deferred = $q.defer();
            console.log("data")
            console.log(data)

            Cloudinary.upload({},
                {
                    file: data,
                    api_key: REST_API.CLOUDINARY_API_KEY,
                    timestamp: new Date(),
                    upload_preset: 'sapotsi2'
                }, function (cuentas) {
                deferred.resolve(cuentas);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }



    }]);
