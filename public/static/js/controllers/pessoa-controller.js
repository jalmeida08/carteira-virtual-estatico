angular.module('carteiraVirtual')
    .controller('PessoaController', function ($scope, $http) {
        $scope.pessoa = {};
        $scope.pessoas = [];
        
        $scope.listarPessoas = function () {                
            
            $http.get("http://localhost:8080/carteiravirtual/resources/pessoa/pessoas")
            .then(function success(res){
                $scope.pessoas = res.data;
            },function error(res){
                console.log("error ", res);                    
            });
            console.log("SALVOU -> ", $scope.pessoa);
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

            $http(req)
            .then(
                function success(res){
                    console.log("sucesso ", res);
            }, 
                function error(res){
                    console.log("erro ", res);
            });
        };
    });