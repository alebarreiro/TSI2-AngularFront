angular.module('sapoApp')
  .controller('MostrarAlmacenCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash', 'ProductoHandler', 'CategoriaHandler', 'categoriaService', 'webscrapService',
    function (almacen, $scope, almacenService, toastr, lodash, ProductoHandler, CategoriaHandler, categoriaService, webscrapService) {

    this.init = function () {
        console.log(almacen);
        $scope.almacenId = almacen.id;
        $scope.almacen = almacen;
        $scope.productos = almacen.stockproductos;
        $scope.categorias = almacen.categorias;
        $scope.colaboradores = almacen.colaboradores;
        $scope.mercadolibre = [];
        $scope.catMercadoLibre = [];
    };

    this.init();

    $scope.aumentarStockProducto = function (idProducto) {

      var index = lodash.findIndex($scope.productos, function(prod) {
          return prod.productoID == idProducto;
      });

    $scope.productos[index].cantidad++;
    };

    $scope.reducirStockProducto = function (idProducto) {

        var index = lodash.findIndex($scope.productos, function(prod) {
            return prod.productoID == idProducto;
        });
        if ($scope.productos[index].cantidad > 0)
            $scope.productos[index].cantidad--;
    };

    $scope.actualizarStockProducto = function (idProducto, stock, nombre) {

        almacenService.actualizarStockAlmacen($scope.almacenId, idProducto, stock)
            .then(function(a) {
                console.log(a);
                toastr.success('Stock de ' + nombre + ' actualizado');
            })
            .catch(function () {
                toastr.error('Hubo un error al modificar el stock.')
            });
    }

    //Crea un producto específico.
    this.crearProducto = function (nombreProducto, descProducto, idCategoria) {
        console.log("nombreProducto: " + nombreProducto + " descProducto " + descProducto);
        var that = this;
        //Invoca al service para hacer el POST de la categoria.
        this.categoria = categoriaService.createProducto(nombreProducto, descProducto, idCategoria)
            .then(function(a) {
                console.log(a);
                toastr.success('Producto ' + nombreProducto + ' creado.');
                a.cantidad = 0;
                $scope.productos.push(a);
                var param = [{"productoID": a.id, "cantidad": a.cantidad}];
                that.cargarProducto(param);
            })
            .catch(function () {
                toastr.error('Hubo un error al dar de alta el producto.')
            });
    };

    this.cargarProducto = function(productos) {
        console.log(productos);
        almacenService.cargarProductosAlmacen($scope.almacenId, productos)
            .then(function(a) {
                console.log(a);
                toastr.success('Producto cargado correctamente');
            })
            .catch(function () {
                toastr.error('Hubo un error al cargar el producto.');
            });
    }


    //Crea una categoria específica.
    this.crearCategoria = function (nombreCategoria, descCategoria) {
        var cat = $scope.categorias;
        var that = this;
        var id = $scope.almacenId;
        //Invoca al service para hacer el POST de la categoria.
        this.categoria = almacenService.crearCategoriaAlmacen(nombreCategoria, descCategoria)
            .then(function(a) {
                console.log(a);
                cat.push(a);
                that.cargarCategoria(id, [a.id]);
            })
            .catch(function () {
                toastr.error('Hubo un error al dar de alta las categorias.');
            });
    };

    //Carga la categoria en el almacén.
    this.cargarCategoria = function(idAlmacen, categoria) {
        almacenService.cargarCategoriasAlmacen(idAlmacen, categoria)
            .then(function(a) {
                console.log(a);
                toastr.success('Categorias del almacen confirmadas');
            })
            .catch(function () {
                toastr.error('Hubo un error al dar de alta las categorias.');
            });
    }

    this.buscarCategorias = function() {
        var ml = $scope.mercadolibre;
        webscrapService.getCategoriasML()
            .then(function(a) {
                toastr.success('Mercado Libre está activo');
                a.forEach(function (c) {
                    ml.push(c);
                });
            })
            .catch(function () {
                toastr.error('Hubo un error al contactar a Mercado Libre.');
            });
    };

    this.seleccionarCategoria = function(idCategoria) {
        var catML = $scope.catMercadoLibre;
        webscrapService.searchCategoriasML(idCategoria)
            .then(function(a) {
                toastr.success('Mercado Libre está activo');
                console.log(a);
                a.results.forEach(function (c) {
                    catML.push(c);
                })
            })
            .catch(function () {
                toastr.error('Hubo un error al contactar a Mercado Libre.');
            });
    }

        this.importarProducto = function(idProducto) {
            webscrapService.addProductosML(idProducto)
                .then(function(a) {
                    toastr.success('Mercado Libre está activo');
                    console.log(a);
                })
                .catch(function () {
                    toastr.error('Hubo un error al contactar a Mercado Libre.');
                });
        }




  }]);