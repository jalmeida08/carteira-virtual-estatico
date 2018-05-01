angular.module('servicos', ['ngResource']).factory('servicos', function ($resource) {
    return $resource(
        'http://localhost:8080/carteiravirtual/resources/:tipo/:id', null);
});