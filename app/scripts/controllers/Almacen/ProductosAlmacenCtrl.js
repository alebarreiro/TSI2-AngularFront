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

            //Crea un producto específico.
            this.crearProducto = function (nombreProducto, descProducto, tags) {
                var that = this;
                //Invoca al service para hacer el POST de la categoria.
                this.categoria = categoriaService.createProducto(nombreProducto, descProducto, $scope.idCategoria)
                    .then(function(a) {
                        toastr.success('Producto ' + nombreProducto + ' creado.');
                        a.cantidad = 0;
                        $scope.productos.push(a);
                        var param = [{"productoID": a.id, "cantidad": a.cantidad}];
                        that.cargarProducto(param, tags);
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
                        console.log(a.id);
                        that.cargarTags(tags, a.id);
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
                            p.producto.imagenes = "http://res.cloudinary.com/sapo/image/upload/v1447175695/10422024_821459174596473_3998766916779207534_n_yga1sw.jpg";
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

            //PRUEBA UPLOAD COULDINARY
            this.add = function(){
                var that = this;
                var f = document.getElementById('file').files[0],
                    r = new FileReader();
                r.onloadend = function(e){
                    console.log(e);
                    $scope.data = e.target.result;
                    that.upload($scope.data);
                }
                r.readAsBinaryString(f);
            }

            //PRUEBA UPLOAD COULDINARY

            this.upload = function(data) {
                cloudinaryService.upload(data)
                    .then(function(result) {
                        console.log(result)
                    })
                    .catch(function() {

                    })
            }

            $scope.uploadFile = function (input) {

                console.log(input);
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    var that = $scope;
                    reader.onload = function (e) {

                        //Sets the Old Image to new New Image
                        $('#photo-id').attr('src', e.target.result);

                        //Create a canvas and draw image on Client Side to get the byte[] equivalent
                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute('src', e.target.result);
                        canvas.width = imageElement.width;
                        canvas.height = imageElement.height;
                        var context = canvas.getContext("2d");
                        context.drawImage(imageElement, 0, 0);
                        var base64Image = canvas.toDataURL("image/jpeg");

                        //Removes the Data Type Prefix
                        //And set the view model to the new value
                        $scope.data = base64Image.replace(/data:image\/jpeg;base64,/g, '');
                        $scope.upload($scope.data);
                    }

                    //Renders Image on Page
                    reader.readAsDataURL(input.files[0]);
                }
            };

            $scope.upload = function(data) {
                cloudinaryService.upload(data.files[0])
                    .then(function(result) {
                        console.log(result)
                    })
                    .catch(function() {

                    })
            }

        }]);