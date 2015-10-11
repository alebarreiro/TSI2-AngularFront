/**
 * Created by alejandrobarreiro on 11/10/15.
 */
'use strict';
angular.module('sapoApp')
  .factory('TemplateHandler', [function () {

    var TemplateHandler = function () {
      this.init();
    };

    TemplateHandler.prototype.templates = {};

    TemplateHandler.prototype.init = function () {};

    TemplateHandler.prototype.setTemplates = function (templates) {
      TemplateHandler.prototype.templates = templates;
    };

    TemplateHandler.prototype.getTemplates = function () {
      return TemplateHandler.prototype.templates;
    };

    TemplateHandler.prototype.getTemplate = function(id) {
      var template;
      TemplateHandler.prototype.getTemplates().forEach(function (t) {
        console.log(t)
        if (t && t.id == id) {
          template = t;
          return;
        }
      });
      return template;
    };

    return TemplateHandler;
  }]);
