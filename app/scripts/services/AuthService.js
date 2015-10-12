/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .service('AuthService', ['$q', 'Usuario', '$location', 'toastr', 'REST_API', 'UsuarioHandler',
    function ($q, Usuario, $location, toastr, REST_API, UsuarioHandler) {

    this.init = function () {};

    this.doFacebookLogin = function() {
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
              facebook: true
            };
            UsuarioHandler.setCurrentUser(currentUser);
            UsuarioHandler.setToken(accessToken);
            that.registrarUsuarioFB(response.first_name, response.last_name, response.email)
              .then(function(u){
                toastr.success('Usuario registrado!');
                console.log(u);
                $location.path('/dashboard/home');
              })
              .catch(function(e) {
                toastr.info("El usuario ya estaba registrado");
                console.log(e);
                $location.path('/dashboard/home');
              });
          });
        } else {
          toastr.error('User cancelled login or did not fully authorize.');
        }
      });
    };

    this.registrarUsuarioFB = function(nombre, apellido, email) {

      var deferred = $q.defer();
      Usuario.registrarUsuario({ }, { id: email, nombre: nombre, apellido: apellido }, function (user) {
        deferred.resolve(user);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.init();

  }]);