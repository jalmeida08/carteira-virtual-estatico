(function () {
    'use strict';

    angular
        .module('carteiraVirtual')
        .controller('PagamentoController', PagamentoController);

    PagamentoController.$inject = [
        '$scope',
        '$rootScope',
        'PagamentoService',
        '$location',
        '$filter',
        '$timeout',
        'pessoaService',
        '$uibModal'
    ];

    function PagamentoController(
        $scope,
        $rootScope,
        PagamentoService,
        $location,
        $filter,
        $timeout,
        pessoaService,
        $uibModal
    ) {
        var vm = this;
        vm.pagamento = {
            valor: undefined,
            dataPagamento: new Date(),
            statusPagamento: undefined,
            fixo: false,
            pessoa: undefined,
            descricao: undefined
        };
        vm.pagamentos = [];
        checarLogin();
        vm.pessoas = [];
        vm.possuiPessoaFisica = false;
        vm.contCaracter = 250;


        function checarLogin() {
            if ($rootScope.usuarioLogado === undefined) {
                $location.path("/");
            };
        }

        vm.getPagamento = function () {
            PagamentoService.getPagamento($location.id)
                .then(function (response) {
                    vm.pagamento = response.data
                }).catch(function (response) {
                    $rootScope.alerta = {
                        tipo: "danger",
                        destaque: "Erro! ",
                        mensagem: response
                    };
                });
        }

        vm.salvar = function () {
            setarPessoaPagamento(vm.pagamento.pessoa);
            PagamentoService.salvar(vm.pagamento)
                .then(function (response) {
                    $rootScope.alerta = {
                        tipo: "success",
                        destaque: "Sucesso",
                        mensagem: "Pagamento salvo com sucesso"
                    };
                    vm.pagamento = undefined;
                }).catch(function (response) {
                    $rootScope.alerta = {
                        tipo: "danger",
                        destaque: "Erro! ",
                        mensagem: response
                    };
                });
        }

        vm.checarPessoaFisica = function () {
            if (vm.possuiPessoaFisica === false) {
                vm.pagamento.pessoa = undefined;
            }
        }

        vm.contarCaracter = function () {
            vm.contCaracter = 250 - vm.pagamento.descricao.length;
        }

        function setarPessoaPagamento(pessoa) {
            var pessoaSelecionada = undefined;
            if (vm.pagamento.pessoa !== undefined) {
                pessoaSelecionada = {
                    idPessoa: pessoa.idPessoa,
                    nome: pessoa.nome,
                    dataNascimento: pessoa.dataNascimento
                }
            }
            vm.pagamento.pessoa = pessoaSelecionada;
        }

        vm.invalidarStatusPagamento = function () {
            if (vm.pagamento.fixo == true) {
                vm.pagamento.statusPagamento = undefined;
            }
        };

        vm.listar = function () {
            PagamentoService.listar()
                .then(function (response) {
                    vm.pagamentos = response.data
                }).catch(function (response) {
                    $rootScope.alerta = {
                        tipo: "danger",
                        destaque: "Erro! ",
                        mensagem: response
                    };
                });
        }

        vm.remover = function (event, pagamento) {
            event.preventDefault();
            console.log(pagamento.idPagamento);
            if (window.confirm("Deseja realmente remover?")) {
                PagamentoService.remover(pagamento.idPagamento)
                    .then(function (response) {
                        var novaLista = vm.pagamentos.slice(0);
                        var indece = novaLista.indexOf(pagamento);
                        novaLista.splice(indece, 1);
                        vm.pagamentos = novaLista;
                        $rootScope.alerta = {
                            tipo: "success",
                            destaque: "Sucesso",
                            mensagem: "Excluido com sucesso"
                        };
                    }).catch(function (response) {
                        $rootScope.alerta = {
                            tipo: "danger",
                            destaque: "Erro",
                            mensagem: response
                        };
                        console.log(response);
                    });
            }
        };

        vm.carregarListaPessoas = function () {
            pessoaService.listar()
                .then(function (response) {
                    vm.pessoas = response.data
                }).catch(function (response) {
                    $rootScope.alerta = {
                        tipo: "danger",
                        destaque: "Erro! ",
                        mensagem: "Erro ao carregar a lista de pessoas"
                    };
                });
        };


        vm.items = ['item1', 'item2', 'item3'];

        vm.animationsEnabled = true;

        vm.open = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                controller: 'PagamentoController',
                controllerAs: 'vm',
                templateUrl: './usuario/_modal.html',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };


        $rootScope.timeout = function () {
            var tempo = 5000;
            $timeout(function () {
                $rootScope.alerta = undefined;
            }, tempo);
        };


    }
})();