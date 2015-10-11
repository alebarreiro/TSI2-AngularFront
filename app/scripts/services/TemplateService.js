/**
 * Created by alejandrobarreiro on 11/10/15.
 */
angular.module('sapoApp')
  .service('templateService', ['$q', 'Template', function ($q, Template) {

    this.init = function () {
    };

    this.templatesPromise = {};

    this.getTemplate = function(id) {
      var deferred = $q.defer();
      Template.getTemplate({ id: id }, {}, function (template) {
        deferred.resolve(template);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.getTemplates = function() {
      var deferred = $q.defer();
      Template.getTemplates({}, {}, function (templates) {

        deferred.resolve(templates);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };


  }]);