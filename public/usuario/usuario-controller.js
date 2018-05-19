(function () {
    'use strict';

    angular
        .module('carteiraVirtual')
        .controller('UsuarioController', UsuarioController);

    UsuarioController.$inject = [
        '$scope',
        '$rootScope',
        'UsuarioService',
        'pessoaService',
        '$location',
        '$timeout',
        '$routeParams'
    ];

    function UsuarioController(
        $scope,
        $rootScope,
        UsuarioService,
        pessoaService,
        $location,
        $timeout,
        $routeParams
    ) {
        var vm = this;
        vm.usuario = {};
        vm.usuarios = [];
        vm.pessoa = {};
        vm.tudo = [];
        vm.confirmarSenha = undefined;
        vm.mensagemSenha = false;
        vm.formError = '';
        //checarLogin();

        function checarLogin() {
            if ($rootScope.usuarioLogado === undefined) {
                $location.path("/");
            };
        };

        vm.salvar = function () {
            var pessoa = vm.pessoa;
            pessoaService.salvar(pessoa).then(function (response) {
                pessoaService.buscarPessoaNomeDataNascimento(pessoa)
                    .then(function (response) {
                        pessoa = response.data;
                        salvarUsuario(pessoa);
                    }, function (response) {
                        console.log("erro -> ", response.data);
                    });
            }, function (response) {
                console.log("erro ao salvar pessoa ", response);
            });
        };

        vm.checarSenhas = function () {
            if (vm.confirmarSenha !== vm.usuario.senha) {
                vm.mensagemSenha = true;
                vm.formError = 'is-invalid';
                return;
            }
            vm.mensagemSenha = false;
            vm.formError = '';
        };

        function salvarUsuario(pessoa) {
            console.log("SALVAR USUARIO CHAMADO")
            var usuario = {
                email: vm.usuario.email,
                senha: vm.usuario.senha,
                pessoa: pessoa
            };
            UsuarioService.salvar(usuario).then(function (response) {
                console.log("Sucesso ", response);
            }).catch(function (response) {
                console.log("erro ", response);
            });
        };

        vm.listar = function () {
            UsuarioService.listar()
                .then(function (response) {
                    vm.usuarios = response.data;
                }).catch(function (erro) {
                    console.log(erro);
                });
        };

        vm.login = function () {
            UsuarioService.login(vm.usuario)
                .then(function (response) {
                    var usuario = response.data;
                    if (usuario.idUsuario === undefined) {
                        $rootScope.alerta = {
                            tipo: "danger",
                            destaque: "Erro!",
                            mensagem: "Login ou senha estão incorreto"
                        };
                    } else {
                        $rootScope.usuarioLogado = usuario;
                        $rootScope.alerta = {
                            tipo: "info",
                            destaque: "Sucesso",
                            mensagem: "Bem vindo a sua carteira virtual"
                        };
                        $location.path('/pessoa');
                    }
                }).catch(function () {
                    $rootScope.alerta = {
                        tipo: "danger",
                        destaque: "Erro!",
                        mensagem: "Login ou senha estão incorreto"
                    };
                });
        };

        vm.remover = function () {
            if (window.confirm("Deseja realmente excluir o usuário")) {
                UsuarioService.remover(vm.usuario)
                    .then(function (response) {
                        $rootScope.alerta = {
                            tipo: "success",
                            destaque: "Sucesso!",
                            mensagem: "Usuário excluido com sucesso"
                        };
                    }).catch(function (response) {
                        $rootScope.alerta = {
                            tipo: "danger",
                            destaque: "Erro!",
                            mensagem: response.data
                        };
                    });
            };
        };

        vm.atualizar = function () {
            console.log(vm.usuario);
            UsuarioService.atualizar(vm.usuario)
                .then(function (response) {
                    $rootScope.alerta = {
                        tipo: "success",
                        destaque: "Sucesso!",
                        mensagem: "Usuário atualizado com sucesso"
                    };
                    $location.path('/usuario')
                }).catch(function (response) {
                    $rootScope.alerta = {
                        tipo: "danger",
                        destaque: "Erro!",
                        mensagem: response.data
                    };
                });
        }

        vm.getUsuario = function () {
            UsuarioService.getUsuario($routeParams.id)
                .then(function (response) {
                    vm.usuario = {
                        idUsuario : response.data.idUsuario,
                        email: response.data.email
                    }
                }).catch(function (response) {
                    console.log(response);
                });
        }

        $rootScope.timeout = function () {
            var tempo = 5000;
            $timeout(function () {
                $rootScope.alerta = undefined;
            }, tempo);
        };

    }
})();