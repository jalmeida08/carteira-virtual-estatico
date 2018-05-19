(function () {
    'use strict';

    angular
        .module('servicos')
        .service('PagamentoService', PagamentoService);

    PagamentoService.$inject = ['servicos', '$q'];
    function PagamentoService(servicos, $q) {
        var PagamentoService = {};
        var tipo = "tipo";

        PagamentoService.getPagamento = function (idPagamento) {
            return $q(function (resolve, reject) {
                servicos.get({ tipo: 'pagamento', id: idPagamento },
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

        PagamentoService.salvar = function (pagamento) {
            return $q(function (resolve, reject) {
                servicos.save({ tipo: 'pagamento' }, pagamento,
                    function (response) {
                        resolve({
                            dado: response
                        });
                    }, function (response) {
                        reject({
                            dado: response
                        });
                    }
                );
            });
        };

        PagamentoService.listar = function () {
            return $q(function (resolve, reject) {
                servicos.query({ tipo: 'pagamento' },
                    function (response) {
                        resolve({
                            data: response
                        });
                    }, function (response) {
                        reject({
                            data: response
                        });
                    }
                );
            });
        };

        PagamentoService.remover = function (idPagamento) {
            return $q(function (resolve, reject) {
                servicos.delete({ tipo: 'pagamento', id: idPagamento },
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

        return PagamentoService;
    }
})();