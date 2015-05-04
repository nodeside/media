'use strict';

angular.module('mean.media').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('media', {
            url: '/media',
            templateUrl: 'media/views/index.html'
        });
    }
]);
