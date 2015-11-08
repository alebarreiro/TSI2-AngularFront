/**
 * Created by alejandrobarreiro on 27/10/15.
 */

angular.module('sapoApp')
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        templateUrl: '../views/dashboard/pages/login.html',
        url: '/login',
        controller: 'LoginCtrl',
      })

    /***********************************************************************************************
     *                                        DASHBOARD                                            *
     ***********************************************************************************************/

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/main.html',
        data: {
          authenticated: true,
        },
        resolve: {
          loadMyDirectives: function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                name: 'sapoApp',
                files: [
                  'scripts/directives/header/header.js',
                  'scripts/directives/header/header-notification/header-notification.js',
                  'scripts/directives/sidebar/sidebar.js',
                  'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                ]
              }),
              $ocLazyLoad.load(
                {
                  name: 'toggle-switch',
                  files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                    "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                  ]
                }),
              $ocLazyLoad.load(
                {
                  name: 'ngAnimate',
                  files: ['bower_components/angular-animate/angular-animate.js']
                })
            $ocLazyLoad.load(
              {
                name: 'ngCookies',
                files: ['bower_components/angular-cookies/angular-cookies.js']
              })
            $ocLazyLoad.load(
              {
                name: 'ngResource',
                files: ['bower_components/angular-resource/angular-resource.js']
              })
            $ocLazyLoad.load(
              {
                name: 'ngSanitize',
                files: ['bower_components/angular-sanitize/angular-sanitize.js']
              })
            $ocLazyLoad.load(
              {
                name: 'ngTouch',
                files: ['bower_components/angular-touch/angular-touch.js']
              })
          }
        }
      })
      .state('dashboard.home', {
        url: '/home',
        controller: 'MainCtrl',
        templateUrl: 'views/dashboard/home.html',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sapoApp',
              files: [
                'scripts/controllers/main.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          },
          notifLimitesCuenta: ['notificacionesService',
            function (notificacionesService) {
              return notificacionesService.getNotificacionesLimiteCuenta().then(function (notificaciones) {
                console.log(notificaciones);
                return notificaciones;
              });
            }],
        }
      })
      .state('dashboard.agregarColaborador', {
        templateUrl: '../views/dashboard/pages/almacen/form-agregarColaborador.html',
        url: '/agregarColaborador',
        controller: 'AgregarColaboradorCtrl',
        controllerAs: 'agregarColaboradorCtrl',
        resolve: {
          almacenes: ['AlmacenHandler', function (AlmacenHandler) {
            var almacenHandler = new AlmacenHandler();
            return almacenHandler.getAlmacenes().then(function (listaAlmacenes) {
              return listaAlmacenes;
            });
          }]
        }
      })
      .state('dashboard.crearAlmacen', {
        templateUrl: '../views/dashboard/pages/almacen/form-crear-almacen-main.html',
        controller: 'CrearAlmacenesCtrl',
        controllerAs: 'crearAlmacenesCtrl',
        url: '/crearAlmacen'
      })
      .state('dashboard.crearAlmacen.datos', {
        templateUrl: '../views/dashboard/pages/almacen/form-crear-almacen-datos.html',
        url: '/datos'
      })
      .state('dashboard.crearAlmacen.templates', {
        templateUrl: '../views/dashboard/pages/almacen/form-crear-almacen-templates.html',
        controller: 'ListarTemplatesCtrl',
        controllerAs: 'listarTemplatesCtrl',
        url: '/templates',
        resolve: {
          templates: ['templateService', function (templateService) {
            return templateService.getTemplates().then(function (listaTemplates) {
              return listaTemplates;
            });
          }]
        }
      })
      .state('dashboard.crearAlmacen.editarTemplate', {
        templateUrl: '../views/dashboard/pages/almacen/form-crear-almacen-editar-template.html',
        url: '/editarTemplate/:templateId',
        controller: 'EditarTemplateCtrl',
        controllerAs: 'editarTemplateCtrl',
        resolve: {
          templateId: ['$stateParams', function ($stateParams) {
            return $stateParams.templateId;
          }],
          categorias: ['categoriaService', function (categoriaService) {
            return categoriaService.getCategorias().then(function (categorias) {
              return categorias;
            })
          }]
        }
      })
      .state('dashboard.crearAlmacen.productos', {
        templateUrl: '../views/dashboard/pages/almacen/form-crear-almacen-productos.html',
        url: '/productos',
        controller: 'ListarProductosCtrl',
        controllerAs: 'listarProductosCtrl',
      })
      .state('dashboard.almacenes', {
        templateUrl: '../views/dashboard/pages/listarAlmacenes.html',
        url: '/almacenes',
        controller: 'ListarAlmacenesCtrl',
        controllerAs: 'listarAlmacenesCtrl',
        resolve: {
          almacenes: ['almacenService', function (almacenService) {
            return almacenService.getMisAlmacenes().then(function (listaAlmacenes) {
              return listaAlmacenes;
            });
          }]
        }
      })
      .state('dashboard.chart', {
        templateUrl: 'views/chart.html',
        url: '/chart',
        controller: 'ChartCtrl',
        controllerAs: 'chartCtrl',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'chart.js',
              files: [
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            })
          },
          reporteVal: ['usuarioService', function (usuarioService) {
            return usuarioService.obtenerReporteValorizacion().then(function (reporte) {
              return reporte;
            });
          }],
          reporteMov: ['usuarioService', function (usuarioService) {
            return usuarioService.obtenerReporteMovimientos().then(function (reporte) {
              return reporte;
            });
          }]
        }
      })
      .state('dashboard.perfil', {
        templateUrl: '../views/dashboard/pages/usuario/perfil.html',
        url: '/perfil',
        controller: 'PerfilCtrl',
        controllerAs: 'perfilCtrl',
        resolve: {
          cuentas: ['cuentaService', function (cuentaService) {
            return cuentaService.getCuentas().then(function (listaCuentas){
              return listaCuentas;
            })
          }]
        }
      })
      .state('dashboard.notificaciones', {
        templateUrl: '../views/dashboard/pages/notificaciones.html',
        url: '/notificaciones',
        controller: 'NotificacionesCtrl',
        controllerAs: 'notificacionesCtrl',
        resolve: {
          almacenes: ['AlmacenHandler', function (AlmacenHandler) {
            var almacenHandler = new AlmacenHandler();
            return almacenHandler.getAlmacenes().then(function (listaAlmacenes) {
              return listaAlmacenes;
            });
          }]
        }
      })

    /***********************************************************************************************
     *                                        ALMACENES                                            *
     ***********************************************************************************************/

      .state('almacen', {
        templateUrl: '../views/almacen/main.html',
        url: '/almacen',
        data: {
          authorization: true,
          authenticated: true,
        },
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'sapoApp',
              files: [
                'scripts/controllers/main.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })

      .state('almacen.home', {
        templateUrl: '../views/almacen/home.html',
        url: '/:url',
        controller: 'MostrarAlmacenCtrl',
        controllerAs: 'mostrarAlmacenCtrl',
        resolve: {
          almacen: ['almacenService', '$stateParams', '$rootScope', 'AUTH_EVENTS', 'authService',
            function (almacenService, $stateParams, $rootScope, AUTH_EVENTS, authService) {
              return almacenService.getAlmacen($stateParams.url).then(function (almacen) {
                if (authService.isAuthorizedInState(almacen)) {
                  return almacen;
                } else {
                  $rootScope.$emit(AUTH_EVENTS.notAuthorized);
                }
              });
            }],
          notificaciones: ['notificacionesService', '$stateParams',
            function (notificacionesService, $stateParams) {
              return notificacionesService.getNotificacionesStock($stateParams.url).then(function (notificaciones) {
                console.log(notificaciones);
                return notificaciones;
              });
            }],
        }
      })

      .state('almacen.webscrap', {
        templateUrl: '../views/almacen/pages/webscrap/webscrap.html',
        url: '/:url/webscrap',
        controller: 'WebScrapCtrl',
        controllerAs: 'webScrapCtrl',
          resolve: {
            almacen: ['almacenService', '$stateParams', '$rootScope', 'AUTH_EVENTS', 'authService', 'AlmacenHandler',
              function (almacenService, $stateParams, $rootScope, AUTH_EVENTS, authService, AlmacenHandler) {
                var almacenHandler = new AlmacenHandler();
                return almacenHandler.getAlmacen($stateParams.url)
                  .then(function (almacen) {
                    //Aca se podria hacer algo lindo como crear un nuevo metodo en el authService
                    //Que permita editar este tipo de cosas solo al dueno del almacen
                    if (authService.isAuthorizedInState(almacen)) {
                      return almacen;
                    } else {
                      $rootScope.$emit(AUTH_EVENTS.notAuthorized);
                    }
                });
              }]
          }
      })

      .state('almacen.webscrap.paso1', {
        templateUrl: '../views/almacen/pages/webscrap/webscrap-paso1.html',
        controller: 'WebScrapPaso1Ctrl',
        controllerAs: 'webScrapPaso1Ctrl'
      })

      .state('almacen.webscrap.paso2', {
        templateUrl: '../views/almacen/pages/webscrap/webscrap-paso2.html',
        controller: 'WebScrapPaso2Ctrl',
        controllerAs: 'webScrapPaso2Ctrl'
      })

      .state('almacen.webscrap.paso3', {
        templateUrl: '../views/almacen/pages/webscrap/webscrap-paso3.html',
        controller: 'WebScrapPaso3Ctrl',
        controllerAs: 'webScrapPaso3Ctrl'
      })

      .state('almacen.carrito', {
        templateUrl: '../views/almacen/pages/carrito/carrito.html',
        url: '/:url/carrito',
        controller: 'CarritoCtrl',
        controllerAs: 'carritoCtrl',
        resolve: {
          almacen: ['almacenService', '$stateParams', '$rootScope', 'AUTH_EVENTS', 'authService',
            function (almacenService, $stateParams, $rootScope, AUTH_EVENTS, authService) {
              return almacenService.getAlmacen($stateParams.url)
                  .then(function (almacen) {
                    if (authService.isAuthorizedInState(almacen)) {
                      return almacen;
                    } else {
                      $rootScope.$emit(AUTH_EVENTS.notAuthorized);
                    }
                  });
            }]
        }
      })

      .state('almacen.colaboradores', {
        templateUrl: '../views/almacen/pages/colaboradores.html',
        url: '/:url/colaboradores',
        controller: 'ColaboradoresCtrl',
        controllerAs: 'colaboradoresCtrl',
        resolve: {
          almacen: ['almacenService', '$stateParams', '$rootScope', 'AUTH_EVENTS', 'authService',
            function (almacenService, $stateParams, $rootScope, AUTH_EVENTS, authService) {
              return almacenService.getAlmacen($stateParams.url)
                  .then(function (almacen) {
                    if (authService.isAuthorizedInState(almacen)) {
                      return almacen;
                    } else {
                      $rootScope.$emit(AUTH_EVENTS.notAuthorized);
                    }
                  });
            }]
        }
      })

      .state('almacen.categorias', {
        templateUrl: '../views/almacen/pages/categorias.html',
        url: '/:url/categorias',
        controller: 'CategoriasAlmacenCtrl',
        controllerAs: 'categoriasAlmacenCtrl',
        resolve: {
          almacen: ['almacenService', '$stateParams', '$rootScope', 'AUTH_EVENTS', 'authService',
            function (almacenService, $stateParams, $rootScope, AUTH_EVENTS, authService) {
              return almacenService.getAlmacen($stateParams.url)
                  .then(function (almacen) {
                    if (authService.isAuthorizedInState(almacen)) {
                      return almacen;
                    } else {
                      $rootScope.$emit(AUTH_EVENTS.notAuthorized);
                    }
                  });
            }]
        }
      })

      .state('almacen.productos', {
        templateUrl: '../views/almacen/pages/productos.html',
        url: '/:url/productos',
        controller: 'ProductosAlmacenCtrl',
        controllerAs: 'productosAlmacenCtrl',
        resolve: {
          almacen: ['almacenService', '$stateParams', '$rootScope', 'AUTH_EVENTS', 'authService',
            function (almacenService, $stateParams, $rootScope, AUTH_EVENTS, authService) {
              return almacenService.getAlmacen($stateParams.url)
                  .then(function (almacen) {
                    if (authService.isAuthorizedInState(almacen)) {
                      return almacen;
                    } else {
                      $rootScope.$emit(AUTH_EVENTS.notAuthorized);
                    }
                  });
            }]
        }
      })


  }]);