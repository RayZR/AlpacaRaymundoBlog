'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {

        $scope.pages = ['index', 'about', 'skill', 'experience', 'contact'];

        $scope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {

            if( fromState.name ){

                var fromPageName = fromState.name.split('.')[1];
                var toPageName   = toState.name.split('.')[1];
                console.log(fromState.name + ',' + toState.name);

                if( $scope.pages.indexOf(fromPageName) < $scope.pages.indexOf(toPageName)){

                    $scope.back = false;
                }else{

                    $scope.back = true;
                }


            }else{
                $scope.back = false;
            }

        });

	}
]);
