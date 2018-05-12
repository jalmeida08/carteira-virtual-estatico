(function () {
    'use strict';

    angular
        .module('carteiraVirtual')
        .controller('UsuarioController', UsuarioController);

    UsuarioController.$inject = ['$scope', '$rootScope', 'UsuarioService', 'pessoaService'];

    function UsuarioController($scope, $rootScope, UsuarioService, pessoaService) {
        var vm = this;
        $scope.usuario = {};
        $scope.usuarios = [];
        $scope.pessoa = {};
        $scope.tudo = [];

        $scope.salvar = function () {
            var pessoa = $scope.pessoa;
            pessoaService.salvar(pessoa).then(function (response) {
                pessoaService.buscarPessoaNomeDataNascimento(pessoa)
                    .then(function (response) {
                        pessoa = response.data
                        salvarUsuario(pessoa);
                    }, function (response) {
                        console.log("erro -> ", response.data);
                    });
            }, function (response) {
                console.log("erro ao salvar pessoa ", response);
            });
        };

        function salvarUsuario(pessoa) {
            var usuario = {
                email: $scope.usuario.email,
                senha: $scope.usuario.senha,
                pessoa: pessoa
            };
            UsuarioService.salvar(usuario).then(function (response) {
                console.log("Sucesso ", response);
            }).catch(function (response) {
                console.log("erro ", response);
            });
        }

        $scope.listar = function () {
            UsuarioService.listar().then(function (response) {
                $scope.usuarios = response.data;
            }).catch(function (erro) {
                console.log(erro);
            });
        };
        
    }
})();