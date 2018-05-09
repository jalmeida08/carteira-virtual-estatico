(function () {
    'use strict';

    angular
        .module('carteiraVirtual')
        .controller('PessoaController', PessoaController);
        PessoaController.$inject = ['$scope', '$rootScope', '$timeout', 'pessoaService'];
        function PessoaController($scope, $rootScope, $timeout, pessoaService) {
        var vm = this;
        vm.pessoa = {};
        vm.pessoas = [];

        vm.listarPessoas = function () {
            pessoaService.listar()
                .then(function (response) {
                    vm.pessoas = response.data;
                    console.log(response);
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

        $rootScope.$on('salvarPessoaDeUsuario', function (event, pessoa) {
            console.log("SALANDO PESSOA DA TELA DE USUARIO", pessoa);
        }); 

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