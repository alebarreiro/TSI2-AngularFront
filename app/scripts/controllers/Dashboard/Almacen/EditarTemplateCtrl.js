/**
 * Created by alejandrobarreiro on 11/10/15.
 */
angular.module('sapoApp')
  .controller('EditarTemplateCtrl', ['templateId', '$scope', 'TemplateHandler', 'toastr', '$location', 'categorias',
    'almacenService', 'CategoriaHandler',
    function (templateId, $scope, TemplateHandler, toastr, $location, categorias, almacenService, CategoriaHandler) {


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

        this.categoriaHandler = new CategoriaHandler();
        this.categoriaHandler.setCategorias(categorias);

        console.log(categorias);
      };

      this.initCats = function () {
        if (this.template && this.template.categorias) {
          var catsId = [],
            cats = this.template.categorias;

          cats.forEach(function (c) {
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


      //Crea una categoria específica.
      this.crearCategoria = function (nombreCategoria, descCategoria) {
        var that = this;
        //Invoca al service para hacer el POST de la categoria.
        this.categoria = almacenService.crearCategoriaAlmacen(nombreCategoria, descCategoria)
            .then(function(a) {
                console.log(a);
                toastr.success('Categorias del almacen confirmadas');
                that.allCategorias.push(a);
                $scope.$parent.almacen.categorias.push(a.id);
                console.log(that.allCategorias);
                that.updateTablaCategoriasSeleccionadas(a.id, true);
            })
            .catch(function () {
                toastr.error('Hubo un error al dar de alta las categorias.')
        });
      };

      this.eliminarCategoria = function (idCategoria) {
        var index = $scope.$parent.almacen.categorias.indexOf(idCategoria);
        if (index > -1) {
          $scope.$parent.almacen.categorias.splice(index, 1);
          this.updateTablaCategoriasSeleccionadas(idCategoria, false);
        }
        ;
      };

      this.updateTablaCategoriasSeleccionadas = function (idCategoria, esNueva) {
        var cats = this.template.categorias;
        var allCats = this.allCategorias;
        if (esNueva) {
          var nuevaCat = $.grep(allCats, function (n, i) {
            return (n.id == idCategoria)
          })[0];
          this.template.categorias.push(nuevaCat);
        } else {
          var array = this.template.categorias;
          $.each(array, function (index, result) {
            if (result.id == idCategoria) {
              array.splice(index, 1);
            }
          });
          this.template.categorias = array;
        }
      };

      this.agregarCategoriasAlmacen = function () {

        var idAlmacen = $scope.$parent.almacen.id,
          categorias = $scope.$parent.almacen.categorias;

        if (!idAlmacen) {
          toastr.warning('Por favor, antes confirme los datos del almacen en el paso 1.');
        } else if (!categorias) {
          toastr.warning('Por favor, seleccione alguna categoría.');
        } else {
          almacenService.cargarCategoriasAlmacen(idAlmacen, categorias)
            .then(function(a) {
              console.log(a);
              toastr.success('Categorias del almacen confirmadas');
            })
            .catch(function () {
              toastr.error('Hubo un error al dar de alta las categorias.')
            });
        }
      }


    }]);