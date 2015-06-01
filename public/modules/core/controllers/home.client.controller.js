'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.current = 0;
        $scope.pages   = ['intro', 'about', 'skill', 'experience', 'contact'];

        function DotNav( el, options ) {
            this.nav = el;
            this.options = extend( {}, this.options );
            extend( this.options, options );
            this._init($scope.current);
        }

        function extend( a, b ) {
            for( var key in b ) {
                if( b.hasOwnProperty( key ) ) {
                    a[key] = b[key];
                }
            }
            return a;
        }

        DotNav.prototype.options = {};

        DotNav.prototype._init = function(current) {

            var dots = [].slice.call( this.nav.querySelectorAll( 'li' ) ), self = this;

            console.log(dots);
            console.log(current);

            dots.forEach( function( dot, idx ) {
                dot.addEventListener( 'click', function( ev ) {
                    ev.preventDefault();

                    console.log("currentPage:" + dots[ current].dataset.id);
                    console.log("targetPage:" + idx);

                    if( idx !== current ) {
                        dots[ current ].className = '';

                        setTimeout( function() {
                            dot.className += ' current';
                            current = idx;
                            if( typeof self.options.callback === 'function' ) {
                                self.options.callback( current );
                            }
                        }, 25 );
                    }
                } );
            } );
        }

        // add to global namespace
        window.DotNav = DotNav;



        [].slice.call( document.querySelectorAll( '.dotstyle > ul' ) ).forEach( function( nav ) {
            new DotNav( nav, {
                callback : function( idx ) {
                    //console.log( idx )
                }
            } );
        } );

        $scope.$watch('current',function(){

            $scope.current
        });





	}
]);
