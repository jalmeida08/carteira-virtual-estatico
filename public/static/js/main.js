angular.module('carteiraVirtual', ['ngRoute', 'servicos', 'ngAnimate'])
.config(function($routeProvider,  $locationProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider.when('/pessoa', {
        templateUrl: './pessoa/pessoa.html',
        controller: 'PessoaController'
    });
    $routeProvider.when('/pessoa/cadastro', {
        templateUrl: './pessoa/pessoa-cadastro.html',
        controller: 'PessoaController'
    });
    $routeProvider.when('/usuario/cadastro', {
        templateUrl: './usuario/usuario-cadastro.html',
        controller: 'UsuarioController'
    });
    $routeProvider.when('/usuario', {
        templateUrl: './usuario/usuario.html',
        controller: 'UsuarioController'
    });
    $routeProvider.otherwise({redirectTo: '/pessoa'});

});