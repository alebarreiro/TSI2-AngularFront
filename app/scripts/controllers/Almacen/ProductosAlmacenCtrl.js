/**
 * Created by alejandro on 11/6/15.
 */

angular.module('sapoApp')
    .controller('ProductosAlmacenCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash', 'ProductoHandler', 'categoriaService', 'webscrapService', 'usuarioService', 'authService', 'cloudinaryService',
        function (almacen, $scope, almacenService, toastr, lodash, ProductoHandler, categoriaService, webscrapService, usuarioService, authService, cloudinaryService) {

            this.init = function () {
                $scope.almacen = almacen;
                $scope.categorias = almacen.categorias;
                $scope.productos = [];
                $scope.prodActual = "";
            };

            this.init();

            // *** FUNCIONES DE PRODUCTOS *** //

            this.aumentarStockProducto = function (idProducto) {
                var index = lodash.findIndex($scope.productos, function(prod) {
                    return prod.id == idProducto;
                });
                $scope.productos[index].cantidad++;
            };

            this.reducirStockProducto = function (idProducto) {

                var index = lodash.findIndex($scope.productos, function(prod) {
                    return prod.id == idProducto;
                });
                if ($scope.productos[index].cantidad > 0)
                    $scope.productos[index].cantidad--;
            };

            this.actualizarStockProducto = function (idProducto, stock, nombre) {
                console.log(idProducto);

                almacenService.actualizarStockAlmacen($scope.almacen.id, idProducto, stock)
                    .then(function(a) {
                        console.log(a);
                        toastr.success('Stock de ' + nombre + ' actualizado');
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al modificar el stock.')
                    });
            }

            //Crea un producto específico, lo asocia al almacén y le sube una imágen.
            this.crearProducto = function (nombreProducto, descProducto, tags) {
                var that = this;
                //Invoca al service para hacer el POST de la categoria.
                this.categoria = categoriaService.createProducto(nombreProducto, descProducto, $scope.idCategoria)
                    .then(function(a) {
                        toastr.success('Producto ' + nombreProducto + ' creado.');
                        a.cantidad = 0;
                        $scope.prodActual = a.id;
                        $scope.productos.push(a);
                        var param = [{"productoID": a.id, "cantidad": a.cantidad}];
                        that.cargarProducto(param, tags);
                        that.uploadFile(a.id);

                    })
                    .catch(function () {
                        toastr.error('Hubo un error al dar de alta el producto.')
                    });
            };

            //Carga una lista de productos en el almacén.
            this.cargarProducto = function(productos, tags) {
                var that = this;
                almacenService.cargarProductosAlmacen($scope.almacen.id, productos)
                    .then(function(a) {
                        //that.uploadFile(a.id);
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al cargar el producto.');
                    });
            }

            this.listarProductos = function(idCategoria) {
                $scope.idCategoria = idCategoria;
                categoriaService.getProductosCatAlmacen($scope.almacen.id,idCategoria)
                    .then(function (productos) {
                        $scope.productos = [];
                        var productosConStock = $scope.productos;

                        productos.forEach(function (p) {
                            p.producto.cantidad = p.cantidad;
                            if (p.producto.imagenes != null && p.producto.imagenes.length > 0)
                                var img = p.producto.imagenes[0];
                            p.producto.imagenes = img;
                            productosConStock.push(p.producto);
                        });
                });
            }

            this.cargarTags = function(tags, idProducto) {
                categoriaService.addTags(idProducto, tags)
                    .then(function(tag) {
                        console.log(tag);
                    })
                    .catch(function(){
                        toastr.error('Hubo un error al cargar los tags.')
                    });
            }

            this.uploadFile = function (idProd) {

                var f = document.getElementById('file').files[0],
                    r = new FileReader(),
                    that = this;
                if (f != null) {
                    r.onloadend = function(e){
                        var data = e.target.result;
                        //send you binary data via $http or $resource or do anything else with it
                        //data.slice(23);
                        that.upload(data, idProd);
                    }
                    r.readAsDataURL(f);
                }
            };

            this.upload = function(data, idProd) {

                cloudinaryService.upload(data, idProd)
                    .then(function(result) {
                        console.log(result)
                    })
                    .catch(function() {

                    })
            }

        }]);