/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .service('authService',
  ['$q', 'Usuario', '$location', 'toastr', 'REST_API', '$cookieStore', 'CURRENT_LOGGED_IN_USER', 'AUTH_EVENTS', '$rootScope', '$state', 'lodash',
    function ($q, Usuario, $location, toastr, REST_API, $cookieStore, CURRENT_LOGGED_IN_USER, AUTH_EVENTS, $rootScope, $state, lodash) {

      this.init = function () {
        this.handleAuthEvents();
        //var loggedUser = this.getLoggedInUser();
      };


      this.doFacebookLogin = function () {

        var that = this;
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token
            // and signed request each expire

            //var uid = response.authResponse.userID;
            //var accessToken = response.authResponse.accessToken;
            that.getPerfilFB(function(user){
              that.setLoggedInUser(user);
              toastr.success('Bienvenido ' + user.nombre + "!");
              $location.path('/dashboard/home');
            });
          } else {
            // the user isn't logged in to Facebook.
            console.log("Loggeando a facebook");
            FB.login(function (response) {
              if (response.authResponse) {
                that.getPerfilFB(function(user){
                  that.setLoggedInUser(user);
                  toastr.success('Bienvenido ' + user.nombre + "!");
                  $location.path('/dashboard/home');
                });
              } else {
                toastr.error('El usuario cancelo el login o no fue autorizado.');
              }
            });
          }
        });
      };

      this.getPerfilFB = function (callback) {
        FB.api('/me', {fields: ['first_name', 'last_name', 'email', 'picture']}, function (response) {
          var accessToken = FB.getAuthResponse().accessToken;
          console.log(response);
          var currentUser = {
            id: response.email,
            nombre: response.first_name,
            apellido: response.last_name,
            email: response.email,
            picture: response.picture.data.url,
            facebook: true,
            token: accessToken
          };
          callback && callback(currentUser);
        });
      };

      this.doFacebookLogout = function (callback) {
        //FB.logout(function(response) {
        //  callback && callback(response);
        //});
      };

      /**
       * Registra el usuario facebook en el backend.
       *
       * @param nombre
       * @param apellido
       * @param email
       * @returns {*}
       */
      this.registrarUsuarioFB = function (nombre, apellido, email, accessToken) {

        var deferred = $q.defer();
        Usuario.registrarUsuario({}, {
          id: email,
          nombre: nombre,
          apellido: apellido,
          token: accessToken
        }, function (user) {
          deferred.resolve(user);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      };

      this.setLoggedInUser = function (currentLoggedInUser) {

        $cookieStore.put(CURRENT_LOGGED_IN_USER, currentLoggedInUser);
      };

      /**
       * Retorna true si el usuario tiene una sesión iniciada
       * @returns {boolean}
       */
      this.isLoggedIn = function () {

        return !!$cookieStore.get(CURRENT_LOGGED_IN_USER);
      };

      /**
       * Remueve el usuario que inicio sesión
       */
      this.removeLoggedInUser = function () {

        $cookieStore.remove(CURRENT_LOGGED_IN_USER);
      };

      /**
       * Retorna el usuario que tiene una sesión iniciada
       * @returns {*|Object}
       */
      this.getLoggedUser = function () {

        return $cookieStore.get(CURRENT_LOGGED_IN_USER);
      };

      this.tradicionalLogin = function(id) {
        var user = {
          id: id
        }
        this.setLoggedInUser(user);
        toastr.success('Bienvenido ' + id + "!");
        $location.path('/dashboard/home');

      };

      /**
       * Retorna true si el usuario esta autorizado para ver el almacen
       * @param almacen
       * @returns {boolean}
       */
      this.isAuthorizedInState = function (almacen) {

        console.log('AUTENTICANDO AL USUARIO DEL ALMACEN...');
        console.log(almacen);
        var loggedUser = this.getLoggedUser().id;
        if (almacen.usuario !== loggedUser) {
          if (almacen.privada) {
            //vemos si es colaborador
            var index = lodash.findIndex(almacen.colaboradores, function(colab){
              return colab.id === loggedUser;
            });
            return index !== -1;
          } else {
            return true;
          }
        } else {
          return true;
        }
      };

      /**
       * Retorna true si el usuario esta autorizado a ir al siguiente estado.
       * @param nextState - Proximo estado del router
       * @returns {boolean}
       */
      this.isAuthenticatedInState = function(nextState) {

        if (nextState && nextState.data && nextState.data.authenticated && !this.isLoggedIn()) {
          return false;
        } else {
          return true;
        }
      };

      this.handleAuthEvents = function() {

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
          toastr.error('No estas autorizado para ver esta almacén.');
          $state.go('dashboard.home');
        }.bind(this));

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
          toastr.error('Autenticación requerida, por favor inicie sesión.');
          this.removeLoggedInUser();
          $state.go('login');
        }.bind(this));

        $rootScope.$on(AUTH_EVENTS.signout, function() {
          this.removeLoggedInUser();
          $state.go('login');
        }.bind(this));

      };

      this.init();

    }]);