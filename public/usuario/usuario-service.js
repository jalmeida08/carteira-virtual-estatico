

(function () {
    'use strict';

    angular
        .module('servicos')
        .factory('UsuarioService', UsuarioService);

    function UsuarioService(servicos, $q, $http) {
        var UsuarioService = {
            getUsuario: getUsuario,
            listar: listar,
            salvar: salvar,
            login: login,
            atualizar: atualizar,
            atualizarSenha: atualizarSenha,
            remover: remover
        };

        function getUsuario(idUsuario) {
            console.log(idUsuario);
            return $q(function (resolve, reject) {
                servicos.get({ tipo: 'usuario', id: idUsuario },
                    function (response) {
                        resolve({
                            data: response
                        });
                    }, function (response) {
                        reject({
                            data: response
                        });
                    });
            });
            /* return $http.get("http://localhost:8080/carteiravirtual/resources/usuario/" + idUsuario); */
        }

        function listar() {
            return $q(function (resolve, reject) {
                servicos.query({ tipo: 'usuario' }, function (response) {
                    resolve({
                        data: response
                    });
                }, function (error) {
                    data: error
                });
            });
        };

        function salvar(usuario) {
            return $q(function (resolve, reject) {
                servicos.save({ tipo: 'usuario' }, usuario,
                    function (response) {
                        resolve({
                            mensagem: "Salvo com sucesso."
                        })
                    }, function (response) {
                        reject({
                            mensagem: "Erro ao salvar.", response
                        })
                    });
            });
        }

        function login(usuario) {
            return $q(function (resolve, reject) {
                servicos.save({ tipo: 'usuario', id: 'login' }, usuario,
                    function (response) {
                        resolve({
                            data: response
                        });
                    }, function (response) {
                        reject({
                            data: response
                        });
                    });
            });
        };

        function atualizar(usuario) {
            return $q(function (resolve, reject) {
                servicos.att({ tipo: 'usuario' }, usuario,
                    function (response) {
                        resolve({
                            data: response
                        });
                    }, function (response) {
                        reject({
                            data: response
                        });
                    });
            });
        };

        function atualizarSenha(senha) {
            return $q(function (resolve, reject) {
                servicos.update({ tipo: 'atualizarSenha' }, usuario,
                    function (response) {
                        resolve({
                            data: response
                        });
                    }, function (response) {
                        reject({
                            data: response
                        });
                    });
            });
        };

        function remover(idUsuario) {
            return $q(function (resolve, reject) {
                servicos.remove({ tipo: 'usuario' },
                    function (response) {
                        resolve({
                            data: response
                        });
                    }, function (response) {
                        reject({
                            data: response
                        });
                    });
            });
        }

        return UsuarioService;
    }
})();