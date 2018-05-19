(function () {
    'use strict';

    angular
        .module('carteiraVirtual')
        .controller('PessoaController', PessoaController);
    PessoaController.$inject = ['$scope', '$rootScope', '$timeout', 'pessoaService', '$location'];
    function PessoaController($scope, $rootScope, $timeout, pessoaService, $location) {
        var vm = this;
        vm.pessoa = {};
        vm.pessoas = [];
        checarLogin();

        function checarLogin() {
            if ($rootScope.usuarioLogado === undefined) {
                $rootScope.alerta = {
                    tipo: "warning",
                    destaque: "Erro!!! ",
                    mensagem: "Faça login para ter acesso ao sistema"
                };
                $location.path("/");
            };
        }

        vm.listarPessoas = function () {
            pessoaService.listar()
                .then(function (response) {
                    vm.pessoas = response.data;
                }).catch(function (erro) {
                    console.log(erro);
                });
        };

        vm.salvar = function () {
            pessoaService.salvar(vm.pessoa)
                .then(function (response) {
                    $rootScope.alerta = {
                        tipo: "success",
                        destaque: "Sucesso!!!",
                        mensagem: response.mensagem
                    };
                    vm.pessoa = null;
                }).catch(function (response) {
                    $rootScope.alerta = {
                        tipo: "danger",
                        destaque: "Erro!!! ",
                        mensagem: "Erro ao salvar"
                    };
                });
        };

        vm.remover = function (event, pessoa) {
            event.preventDefault();
            if (window.confirm("Deseja relamente remover?")) {
                pessoaService.remover(pessoa.idPessoa)
                    .then(function (response) {
                        var novaLista = vm.pessoas.slice(0);
                        var indice = novaLista.indexOf(pessoa);
                        novaLista.splice(indice, 1);
                        vm.pessoas = novaLista;
                        $rootScope.alerta = {
                            tipo: "success",
                            destaque: "Sucesso",
                            mensagem: "Excluido com sucesso"
                        };
                    }).catch(function (response) {
                        $rootScope.alerta = {
                            tipo: "danger",
                            destaque: "Erro",
                            mensagem: "Erro ao tentar Excluir"
                        };
                    });
            }
        };

        $rootScope.timeout = function () {
            var tempo = 5000;
            $timeout(function () {
                $rootScope.alerta = undefined;
            }, tempo);
        };
    }
})();