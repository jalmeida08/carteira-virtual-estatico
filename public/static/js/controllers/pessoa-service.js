angular.module('servicos').factory('pessoaService', function (servicos, $q) {
    var obj = {};

    obj.salvar = function (pessoa) {
        return $q(function (resolve, reject) {
            servicos.save({ tipo: 'pessoa' }, pessoa,
                function () {
                    resolve({
                        mensagem: "Salvo com sucesso"
                    });
                }, function (error) {
                    console.log("erro ", error);
                }
            );
        });
    };

    obj.listar = function () {
        return $q(function (resolve, reject) {
            servicos.query({ tipo: 'pessoa' }, function (response) {
                resolve({
                    data: response
                });
            }, function (error) {
                console.log("error", error);
            });
        });
    };

    obj.remover = function (idPessoa) {
        console.log(idPessoa);
        return $q(function (resolve, reject) {
            servicos.delete({ tipo: 'pessoa', id : idPessoa },
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

    return obj;

});