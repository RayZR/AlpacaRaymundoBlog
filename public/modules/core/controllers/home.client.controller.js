'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state',
	function($scope, Authentication, $state) {

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


        $scope.$on('scrollDown', function(){

            var currentNum  = $scope.pages.indexOf($scope.currentState.name.split('.')[1]);
            var nextNum     = currentNum + 1 ;

            if( nextNum <= $scope.pages.length-1 ){
                var nextState   = 'home.' + $scope.pages[nextNum];
                $state.go(nextState);
            }

            console.log('scrollDown');
        });

        $scope.$on('scrollUp', function(){

            var currentNum  = $scope.pages.indexOf($scope.currentState.name.split('.')[1]);
            var nextNum     = currentNum - 1 ;

            if( nextNum >= 0){
                var nextState   = 'home.' + $scope.pages[nextNum];
                $state.go(nextState);
            }

            console.log('scrollUp');

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
