

(function () {
    'use strict';

    angular
        .module('servicos')
        .factory('UsuarioService', UsuarioService);

    function UsuarioService(servicos, $q) {
        var UsuarioService = {
            listar: listar,
            salvar : salvar
        };



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

        function salvar(usuario){
            return $q(function(resolve, reject){
                servicos.save({tipo : 'usuario'}, usuario, function(response){
                    resolve({
                        mensagem : "Salvo com sucesso."
                    }) 
                }, function(response){
                    reject({
                        mensagem : "Erro ao salvar.", response
                    })
                });
            });
        }

        return UsuarioService;
    }
})();