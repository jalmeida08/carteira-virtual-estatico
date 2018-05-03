angular.module('carteiraVirtual').controller('PessoaController', function ($scope, $timeout, $rootScope, pessoaService) {
        $scope.pessoa = {};
        $scope.pessoas = [];
        
        
        
         $scope.listarPessoas = function () {
            pessoaService.listar()
                .then(function(response){
                    $scope.pessoas = response.data;
                    console.log(response);
                }).catch(function(erro){
                    console.log(erro);
            });
        }; 

        $scope.salvar = function () {
            pessoaService.salvar($scope.pessoa)
                .then(function(response){
                    $rootScope.alerta = {
                        tipo : "success",
                        destaque : "Sucesso!!!",
                        mensagem : response.mensagem
                    };
                    $scope.pessoa = null;
                }).catch(function(response){
                    $rootScope.alerta = {
                        tipo : "danger",
                        destaque : "Erro!!! ",
                        mensagem : "Erro ao salvar"
                    };
                });
        };

         $scope.remover = function (event, pessoa) {
            event.preventDefault();
             if(window.confirm("Deseja relamente remover?")){
                 pessoaService.remover(pessoa.idPessoa)
                    .then(function(response){
                        var novaLista = $scope.pessoas.slice(0); 
                        var indice = novaLista.indexOf(pessoa);
                        novaLista.splice(indice, 1);
                        $scope.pessoas = novaLista;
                        $rootScope.alerta = {
                            tipo : "success",
                            destaque : "Sucesso",
                            mensagem : "Excluido com sucesso"
                        };                     
                    }).catch(function(response){
                        $rootScope.alerta = {
                            tipo : "danger",
                            destaque : "Erro",
                            mensagem : "Erro ao tentar Excluir"
                        };
                    });
             }
        };
        $rootScope.timeout = function(){
            var tempo = 5000;
            $timeout(function(){
                $rootScope.alerta = undefined;
            }, tempo);
        };
    });

/* 


(function () {
    'use strict';

    angular
        .module('carteiraVirtual')
        .controller('PessoaController', PessoaController);

    //  ControllerController.$inject = 
    function PessoaController($scope, $timeout, $rootScope, pessoaService) {
        var vm = this;


        $scope.pessoa = {};
        $scope.pessoas = [];



        $scope.listarPessoas = function () {
            pessoaService.listar()
                .then(function (response) {
                    $scope.pessoas = response.data;
                    console.log(response);
                }).catch(function (erro) {
                    console.log(erro);
                });
        };

        $scope.salvar = function () {
            pessoaService.salvar($scope.pessoa)
                .then(function (response) {
                    $rootScope.alerta = {
                        tipo: "success",
                        destaque: "Sucesso!!!",
                        mensagem: response.mensagem
                    };
                    $scope.pessoa = null;
                }).catch(function (response) {
                    $rootScope.alerta = {
                        tipo: "danger",
                        destaque: "Erro!!! ",
                        mensagem: "Erro ao salvar"
                    };
                });
        };

        $scope.remover = function (event, pessoa) {
            event.preventDefault();
            if (window.confirm("Deseja relamente remover?")) {
                pessoaService.remover(pessoa.idPessoa)
                    .then(function (response) {
                        var novaLista = $scope.pessoas.slice(0);
                        var indice = novaLista.indexOf(pessoa);
                        novaLista.splice(indice, 1);
                        $scope.pessoas = novaLista;
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
*/