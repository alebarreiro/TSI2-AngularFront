/**
 * Created by alejandrobarreiro on 11/10/15.
 */
angular.module('sapoApp')
  .controller('ListarTemplatesCtrl', [ '$scope', 'templates', 'TemplateHandler', function ($scope, templates, TemplateHandler) {

    this.init = function() {
      this.templateHandler =  new TemplateHandler();


      this.templateHandler.setTemplates(templates);
      console.log("HOLAAAA ");
      this.templates = templates;
      console.log(templates);

    };

    this.init();
  }]);