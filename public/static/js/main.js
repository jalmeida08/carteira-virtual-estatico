angular.module('carteiraVirtual', ['ngRoute', 'ngResource'])
.config(function($routeProvider,  $locationProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider.when('/pessoa', {
        templateUrl: 'pessoa.html',
        controller: 'PessoaController'
    });
    $routeProvider.when('/pessoa/cadastro', {
        templateUrl: 'pessoa-cadastro.html',
        controller: 'PessoaController'
    });
    $routeProvider.otherwise({redirectTo: '/pessoa'});

});