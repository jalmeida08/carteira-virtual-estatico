angular.module('carteiraVirtual')
    .controller('PessoaController', function($scope){
        $scope.salvar = function(){
            console.log("salvou", nome);
        };
    });