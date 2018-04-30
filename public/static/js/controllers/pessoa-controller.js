angular.module('carteiraVirtual')
    .controller('PessoaController', function ($scope, $http, $resource) {
        $scope.pessoa = {};
        $scope.pessoas = [];
        
        var recursoPessoa = $resource('http://localhost:8080/carteiravirtual/resources/pessoa/:idPessoa');
        
        $scope.listarPessoas = function () {                

            recursoPessoa.query(
                function(response){
                $scope.pessoas = response;
            },
                function(error){
                console.log("error ", res);                                    
            });
        };
        
        $scope.salvar = function(){
            console.log(JSON.stringify($scope.pessoa));
            
            var req = {
                method: 'POST',
                url: 'http://localhost:8080/carteiravirtual/resources/pessoa/',
                headers: {
                    'Content-Type': "application/json"
                },
                data: JSON.stringify($scope.pessoa)
               };

            $http.post("http://localhost:8080/carteiravirtual/resources/pessoa",
            JSON.stringify($scope.pessoa),
            { headers : 'Content-Type : application/json'})
            .then(
                function success(res){
                    console.log("sucesso ", res);
            }, 
                function error(res){
                    console.log("erro ", res);
            });
        };

        $scope.remover = function(idPessoa){
            console.log(JSON.stringify(idPessoa));            
            $http.delete("http://localhost:8080/carteiravirtual/resources/pessoa/"+idPessoa)
        .then(
            function success(res){
                console.log("sucesso ", res);
        }, 
            function error(res){
                console.log("erro ", res);
        });
        };
});