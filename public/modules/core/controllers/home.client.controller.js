'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state',
	function($scope, Authentication, $state, $element) {

        $scope.pages = ['index', 'about', 'skill', 'experience', 'contact'];

        $scope.back = false;

        $scope.$on('$stateChangeStart',  function(event, toState, toParams, fromState, fromParams) {

            if( toState.name && fromState.name){

                var currentStateName = $scope.currentState.name.split('.')[1];
                var toStateName   = toState.name.split('.')[1];

                if( $scope.pages.indexOf(currentStateName) < $scope.pages.indexOf(toStateName)){

                    $scope.back = false;
                }else{

                    $scope.back = true;
                }

                if(!$scope.$$phase) {

                    $scope.$apply();
                }
            }else{

                $scope.back = false;

                if(!$scope.$$phase) {

                    $scope.$apply();
                }
            }
        });

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

            $scope.currentState = toState;
        });

        $scope.$on('scrollDown', function(){

            var currentNum  = $scope.pages.indexOf($scope.currentState.name.split('.')[1]);
            var nextNum     = currentNum + 1 ;

            if( nextNum <= $scope.pages.length-1 ){
                var nextState   = 'home.' + $scope.pages[nextNum];
                $state.go(nextState);
            }

        });

        $scope.$on('scrollUp', function(){

            var currentNum  = $scope.pages.indexOf($scope.currentState.name.split('.')[1]);
            var prevNum     = currentNum - 1 ;

            if( prevNum >= 0){
                var prevState   = 'home.' + $scope.pages[prevNum];
                $state.go(prevState);
            }

        });

        var scrollTimer = '';

        $(window).on( 'DOMMouseScroll mousewheel onmousewheel', function ( event ) {

            if (scrollTimer) { clearTimeout(scrollTimer); }

               if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) {

                   //scroll down
                   scrollTimer = setTimeout(function() {
                       $scope.$emit('scrollDown');
                   }, 200);

               } else {

                   //scroll up
                   scrollTimer = setTimeout(function() {
                       $scope.$emit('scrollUp');
                   }, 200);

               }
                                        //prevent page fom scrolling
               return false;
        });

	}
]);
