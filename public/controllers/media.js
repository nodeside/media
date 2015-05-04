'use strict';

/* jshint -W098 */


angular.module('mean.media', ['ui.filters']).controller('MediaController', ['$scope', '$stateParams', '$location', 'Global', 'Media', '$http',
    function($scope, $stateParams, $location, Global, Media, $http) {
        $scope.global = Global;
        $scope.myform = true;
        $scope.editForm = true;
        $scope.mediaFilter = 'all';
        var fileVal;

        $scope.toggle = function() {
            $scope.myform = !$scope.myform;
        };
        $scope.cancelAdd = function() {
            $scope.myform = true;
        }
        $scope.cancelEdit = function() {
            $scope.editForm = true;
        }
        $scope.uploadFileArticleCallback = function(file) {
            fileVal = file;
        };

//        Filter functionality
        $scope.filterList = function(val) {
            $http.post('/media/filter/list', {data: val}).success(function(response) {
                $scope.meidaList = response;
            }).error(function(data) {
                console.log(data);
            });
        };
//        Search functionality
        $scope.searchList = function(val) {
            $http.post('/media/search/list', {data: val}).success(function(response) {
                $scope.meidaList = response;
            }).error(function(data) {
                console.log(data);
            });
        };
//        Insert functionality
        $scope.create = function(isValid) {
            if (isValid) {
                var fileExtension = fileVal.type.split("/")
                var media = new Media({
                    name: this.name,
                    description: this.desc,
                    imageName: fileVal.name,
                    mimeType: fileExtension[1]
                });
                media.$save(function(response) {
//                    console.log(response);
                });
                this.name = '';
                this.desc = '';
                document.getElementById("file_browse").value = null;
                $scope.myform = true;
                Media.query(function(media) {
                    $scope.meidaList = media;
                });
            } else {
                $scope.submitted = true;
            }
        };
//        List functionality
        $scope.find = function() {
            Media.query(function(media) {
                $scope.meidaList = media;
                $scope.filterData = media;
            });
        };
//        Find by id for edit functionality
        $scope.findOne = function(val) {
            Media.get({
                mediaId: val
            }, function(media) {
                $scope.editForm = false;
                $scope.media = media;
            });
        };
//        Edit functionality
        $scope.update = function(isValid) {
            if (isValid) {
                var media = $scope.media;
                if (!media.updated) {
                    media.updated = [];
                }
                media.updated.push(new Date().getTime());

                media.$update(function() {
                    $scope.editForm = true;
                    Media.query(function(media) {
                        $scope.meidaList = media;
                    });
                });
            } else {
                $scope.submitted = true;
            }
        };
//        Delete functionality
        $scope.remove = function(media) {
            if (media) {
                if (confirm('Are You Sure You Want To Delete This Record !! ')) {
                    media.$remove(function(response) {
                        for (var i in $scope.media) {
                            if ($scope.media[i] === media) {
                                $scope.media.splice(i, 1);
                            }
                        }
                        Media.query(function(media) {
                            $scope.meidaList = media;
                        });
                    });
                }
            } else {
                $scope.media.$remove(function(response) {
                    $location.path('media');
                });
            }
        };
    }
]);


