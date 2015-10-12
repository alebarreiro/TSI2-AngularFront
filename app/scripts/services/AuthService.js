/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .service('authService', ['$q', 'Usuario', '$location', 'toastr', 'REST_API',  '$cookieStore', 'CURRENT_LOGGED_IN_USER',
    function ($q, Usuario, $location, toastr, REST_API, $cookieStore, CURRENT_LOGGED_IN_USER) {

      this.init = function () {

        //var loggedUser = this.getLoggedInUser();
      };

      this.doFacebookLogin = function () {
        var that = this;
        FB.login(function (response) {
          if (response.authResponse) {
            
            FB.api('/me', {fields: ['first_name', 'last_name', 'email']}, function (response) {
              toastr.success('Bienvenido ' + response.first_name + "!");
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
              //var userHler = new UsuarioHandler();
              //userHler.setCurrentUser(currentUser);
              //userHler.setToken(accessToken);
              if (that.isLoggedIn()) {
                $location.path('/dashboard/home');
              } else {
                that.setLoggedInUser(currentUser);
                that.registrarUsuarioFB(response.first_name, response.last_name, response.email)
                  .then(function (u) {
                    toastr.success('Usuario registrado!');
                    console.log(u);
                    $location.path('/dashboard/home');
                  })
                  .catch(function (e) {
                    toastr.info("El usuario ya estaba registrado");
                    console.log(e);
                    $location.path('/dashboard/home');
                  });
              }
            });
          } else {
            toastr.error('El usuario cancelo el login o no fue autorizado.');
          }
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
      this.registrarUsuarioFB = function (nombre, apellido, email) {

        var deferred = $q.defer();
        Usuario.registrarUsuario({}, {id: email, nombre: nombre, apellido: apellido}, function (user) {
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
      this.removeLoggedInUser = function() {

        $cookieStore.remove(CURRENT_LOGGED_IN_USER);
      };

      /**
       * Retorna el usuario que tiene una sesión iniciada
       * @returns {*|Object}
       */
      this.getLoggedUser = function () {

        return $cookieStore.get(CURRENT_LOGGED_IN_USER);
      };

      this.init();

    }]);