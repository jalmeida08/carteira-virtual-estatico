angular.module('carteiraVirtual', ['ngRoute'])
.config(function($routeProvider,  $locationProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider.when('/pessoa', {
        templateUrl: 'pessoa.html',
        controller: 'PessoaController'
    });

});