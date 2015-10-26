'use strict';
/**
 * @ngdoc overview
 * @name sapoApp
 * @description
 * # sapoApp
 *
 * Main module of the application.
 */
angular
  .module('sapoApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngAnimate',
        'toastr',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngLodash'

  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        authenticated: true,
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sapoApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        authenticated: true,
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sapoApp',
              files:[
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
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.agregarColaborador',{
        templateUrl:'../views/dashboard/pages/almacen/form-agregarColaborador.html',
        url:'/agregarColaborador',
        controller: 'AgregarColaboradorCtrl',
        controllerAs: 'agregarColaboradorCtrl',
      })

    /**
     * FORMULARIO PARA CREAR UNA NUEVA ALMACEN
     */
      .state('dashboard.crearAlmacen',{
        templateUrl:'../views/dashboard/pages/almacen/form-crear-almacen-main.html',
        controller: 'CrearAlmacenesCtrl',
        controllerAs: 'crearAlmacenesCtrl',
        url:'/crearAlmacen'
      })
      .state('dashboard.crearAlmacen.datos',{
        templateUrl:'../views/dashboard/pages/almacen/form-crear-almacen-datos.html',
        url:'/datos'
      })
      .state('dashboard.crearAlmacen.templates',{
        templateUrl:'../views/dashboard/pages/almacen/form-crear-almacen-templates.html',
        controller: 'ListarTemplatesCtrl',
        controllerAs: 'listarTemplatesCtrl',
        url:'/templates',
        resolve: {
          templates: ['templateService', function(templateService) {
            return templateService.getTemplates().then(function(listaTemplates) {
              return listaTemplates;
            });
          }]
        }
      })
      .state('dashboard.crearAlmacen.editarTemplate',{
        templateUrl:'../views/dashboard/pages/almacen/form-crear-almacen-editar-template.html',
        url:'/editarTemplate/:templateId',
        controller: 'EditarTemplateCtrl',
        controllerAs: 'editarTemplateCtrl',
        resolve: {
          templateId: ['$stateParams', function($stateParams) {
            return $stateParams.templateId;
          }],
          categorias: ['categoriaService', function(categoriaService) {
            return categoriaService.getCategorias().then(function(categorias){
              return categorias;
            })
          }]
        }
      })
      .state('dashboard.crearAlmacen.productos',{
        templateUrl:'../views/dashboard/pages/almacen/form-crear-almacen-productos.html',
        url:'/productos',
        controller: 'ListarProductosCtrl',
        controllerAs: 'listarProductosCtrl',
      })


      .state('login',{
        templateUrl:'../views/dashboard/pages/login.html',
        url:'/login',
        controller: 'LoginCtrl',
      })
      .state('dashboard.almacenes', {
        templateUrl: '../views/dashboard/pages/listarAlmacenes.html',
        url: '/almacenes',
        controller: 'ListarAlmacenesCtrl',
        controllerAs: 'listarAlmacenesCtrl',
        resolve: {
          almacenes: ['almacenService', function(almacenService) {
            return almacenService.getMisAlmacenes().then(function(listaAlmacenes) {
              return listaAlmacenes;
            });
          }]
          }
        })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sapoApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })


      .state('almacen/:url', {
        templateUrl: '../views/almacen/home.html',
        url: '/almacen/:url',
        controller: 'MostrarAlmacenCtrl',
        controllerAs: 'mostrarAlmacenCtrl',
        resolve: {
          almacen: ['almacenService', '$stateParams', function(almacenService, $stateParams) {
            return almacenService.getAlmacen($stateParams.url).then(function(almacen){
              return almacen;
            });
          }],
        }
      })
  }]);

    
