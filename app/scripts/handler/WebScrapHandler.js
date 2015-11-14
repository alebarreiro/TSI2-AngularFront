/**
 * Created by alejandro on 11/14/15.
 */

'use strict';
angular.module('sapoApp')
    .factory('WebScrapHandler', [function () {

        var WebScrapHandler = function () {
            this.init();
        };

        WebScrapHandler.prototype.categoria = {};

        WebScrapHandler.prototype.init = function () {};

        WebScrapHandler.prototype.setCategoria = function (categoria) {
            WebScrapHandler.prototype.categoria = categoria;
        };

        WebScrapHandler.prototype.getCategoria = function () {
            return WebScrapHandler.prototype.categoria;
        };

        return WebScrapHandler;
    }]);
