'use strict';


angular.module('mean.media').factory('Media', ['$resource',
  function($resource) {
    return $resource('media/:mediaId', {
      mediaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);