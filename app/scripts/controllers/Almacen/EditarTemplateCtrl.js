/**
 * Created by alejandrobarreiro on 11/10/15.
 */
angular.module('sapoApp')
  .controller('EditarTemplateCtrl', ['templateId', '$scope', 'TemplateHandler', function (templateId, $scope,TemplateHandler) {


    this.init = function() {
      this.templateHanlder = new TemplateHandler();

      this.template = this.templateHanlder.getTemplate(templateId);
      console.log(this.template);
    };

      this.init();
  }]);