(function () {
    'use strict';

    angular
        .module('carteiraVirtual')
        .controller('UsuarioController', UsuarioController);

    function UsuarioController($scope, UsuarioService) {
        var vm = this;
        $scope.usuario = {};
        $scope.usuarios = [];

        $scope.salvar = function () {
            UsuarioService.salvar($scope.usuario)
                .then(function(response){
                    console.log("Sucesso ", response);
                }).catch(function(response){
                    console.log("erro ", response);
                });
        };

        $scope.listar = function () {
            UsuarioService.listar()
                .then(function(response){
                    $scope.usuarios = response.data;
                }).catch(function(erro){
                    console.log(erro);
            });
        };
    }
})();