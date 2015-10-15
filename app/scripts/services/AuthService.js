/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .service('authService', ['$q', 'Usuario', '$location', 'toastr', 'REST_API', '$cookieStore', 'CURRENT_LOGGED_IN_USER',
    function ($q, Usuario, $location, toastr, REST_API, $cookieStore, CURRENT_LOGGED_IN_USER) {

      this.init = function () {

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
        FB.api('/me', {fields: ['first_name', 'last_name', 'email']}, function (response) {
          var accessToken = FB.getAuthResponse().accessToken;
          console.log(accessToken);
          var currentUser = {
            id: response.email,
            nombre: response.first_name,
            apellido: response.last_name,
            email: response.email,
            facebook: true,
            token: accessToken
          };
          callback && callback(currentUser);
        });
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

      this.init();

    }]);