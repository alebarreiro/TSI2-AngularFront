/**
 * Created by alejandrobarreiro on 11/10/15.
 */
angular.module('sapoApp')
  .controller('EditarTemplateCtrl', ['templateId', '$scope', 'TemplateHandler', 'toastr', '$location', 'categorias',
    function (templateId, $scope, TemplateHandler, toastr, $location, categorias) {


    this.init = function () {
      this.templateHanlder = new TemplateHandler();
      var error = false;
      if (templateId) {
        this.template = this.templateHanlder.getTemplate(templateId);
        if (!this.template) {
          toastr.warning('Template ' + templateId + ' no encontrado');
          error = true;
        }
      } else {
        toastr.warning('Debes elegir un template primero');
        error = true;
      }

      if (error) $location.path('/dashboard/crearAlmacen/templates')

      this.allCategorias = categorias;
      console.log("CATEGORIAS!!");
      console.log(categorias);
    };

    this.initCats = function() {
      if (this.template && this.template.categorias) {
        var catsId = [],
          cats = this.template.categorias;

        cats.forEach(function(c){
          catsId.push(c.id);
        });
        $scope.$parent.almacen.categorias = catsId;
      }
    };

    this.init();
    this.initCats();

    this.agregarCategoria = function (idCategoria) {
      var index = $scope.$parent.almacen.categorias.indexOf(idCategoria);
      if (index > -1) {
        toastr.info('Ya agregaste dicha categoría');
      } else {
        $scope.$parent.almacen.categorias.push(idCategoria);
        this.updateTablaCategoriasSeleccionadas(idCategoria, true);
      }
    };

    this.eliminarCategoria = function (idCategoria) {
      var index = $scope.$parent.almacen.categorias.indexOf(idCategoria);
      if (index > -1) {
        $scope.$parent.almacen.categorias.splice(index, 1);
        this.updateTablaCategoriasSeleccionadas(idCategoria, false);
      };
    };

    this.updateTablaCategoriasSeleccionadas = function(idCategoria, esNueva) {
      var cats = this.template.categorias;
      var allCats = this.allCategorias;
      if (esNueva) {
        var nuevaCat = $.grep(allCats, function(n, i){
          return(n.id == idCategoria)
        })[0];
        this.template.categorias.push(nuevaCat);
      } else {
        var array = this.template.categorias;
        $.each(array, function(index, result) {
          if(result.id == idCategoria) {
            array.splice(index, 1);
          }
        });
        this.template.categorias = array;
      }
    }

  }]);