'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {

        $scope.pages = ['index', 'about', 'skill', 'experience', 'contact'];

        $scope.$on('$stateChangeStart',  function(event, toState, toParams, fromState, fromParams) {

            if( fromState.name ){

                var fromPageName = fromState.name.split('.')[1];
                var toPageName   = toState.name.split('.')[1];

                if( $scope.pages.indexOf(fromPageName) < $scope.pages.indexOf(toPageName)){

                    $scope.back = false;
                }else{

                    $scope.back = true;
                }

            }else{

                $scope.back = false;
            }

        });


        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $scope.currentState = toState;
            }
        );

        var scrollTimer = '';

        $(window).on( 'mousewheel', function ( event ) {

            if (scrollTimer) { clearTimeout(scrollTimer); }

               if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) {
                      //scroll down

                   scrollTimer = setTimeout(function() {
                       $(window).trigger('scrollUp');
                   }, 200);

                      } else {
                         //scroll up
                   scrollTimer = setTimeout(function() {
                       $(window).trigger('scrollDown');
                   }, 200);

                      }
                                        //prevent page fom scrolling
                      return false;
               });



	}
]);
