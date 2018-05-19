angular.module('carteiraVirtual', ['ngRoute', 'servicos', 'ngAnimate', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        $routeProvider.when('/pessoa', {
            templateUrl: './pessoa/pessoa.html',
            controller: 'PessoaController as vm'
        });
        $routeProvider.when('/pessoa/cadastro', {
            templateUrl: './pessoa/pessoa-cadastro.html',
            controller: 'PessoaController as vm'
        });
        /* USUARIO */
        $routeProvider.when('/', {
            templateUrl: './usuario/login.html',
            controller: 'UsuarioController as vm'
        });
        $routeProvider.when('/usuario/cadastro', {
            templateUrl: './usuario/usuario-cadastro.html',
            controller: 'UsuarioController as vm'
        });
        $routeProvider.when('/usuario/editar/:id', {
            templateUrl: './usuario/usuario-editar.html',
            controller: 'UsuarioController as vm'
        });
        $routeProvider.when('/usuario', {
            templateUrl: './usuario/usuario.html',
            controller: 'UsuarioController as vm'
        });
        /* USUARIO */
        $routeProvider.when('/pagamento', {
            templateUrl: './pagamento/pagamento.html',
            controller: 'PagamentoController as vm'
        });
        $routeProvider.when('/pagamento/novo-pagamento', {
            templateUrl: './pagamento/pagamento-cadastro.html',
            controller: 'PagamentoController as vm'
        });
        $routeProvider.otherwise({ redirectTo: '/' });

    });
