angular.module('core').directive('subPage',function(){
    return{
        restrict: 'A',
        replace: true,
        template: '<div id="large-header-{{page}}"  class="pt-page page-{{ 1*$index + 1 }} large-header"> <canvas id="demo-canvas"></canvas><h1 class="main-title"> {{ page }} </h1></div>',
        link: function(scope, element, attrs) {



                // Main


            if(scope.$last){
                (function() {
                    var lastTime = 0;
                    var vendors = ['ms', 'moz', 'webkit', 'o'];
                    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                        || window[vendors[x]+'CancelRequestAnimationFrame'];
                    }

                    if (!window.requestAnimationFrame)
                        window.requestAnimationFrame = function(callback, element) {
                            var currTime = new Date().getTime();
                            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                                timeToCall);
                            lastTime = currTime + timeToCall;
                            return id;
                        };

                    if (!window.cancelAnimationFrame)
                        window.cancelAnimationFrame = function(id) {
                            clearTimeout(id);
                        };
                }());



                (function(window) {

                    var $main = $( '#pt-main' ),
                        $pages = $main.children( 'div.pt-page' ),
                        pagesCount = $pages.length,
                        isAnimating = false,
                        endCurrPage = false,
                        endNextPage = false,
                        animEndEventNames = {
                            'WebkitAnimation' : 'webkitAnimationEnd',
                            'OAnimation' : 'oAnimationEnd',
                            'msAnimation' : 'MSAnimationEnd',
                            'animation' : 'animationend'
                        },
                    // animation end event name
                        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
                    // support css animations
                        support = Modernizr.cssanimations;

                    function init() {

                        $pages.each( function() {
                            var $page = $( this );
                            $page.data( 'originalClassList', $page.attr( 'class' ) );
                        } );

                        $pages.eq( scope.current ).addClass( 'pt-page-current' );

                        $(window).on( 'mousewheel', function ( event ) {
                            if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) {
                                //alternative options for wheelData: wheelDeltaX & wheelDeltaY
                                //scroll down
                                if( !isAnimating ) {
                                    console.log('Down');
                                    gotoPage(scope.current+1);

                                }

                            } else {
                                //scroll up

                                if( !isAnimating ) {
                                    console.log('Up');
                                    gotoPage(scope.current-1);
                                }
                            }
                            //prevent page fom scrolling
                            return false;
                        });

                    }


                    function gotoPage(pageNumber) {

                        if( isAnimating ) {
                            return false;
                        }

                        isAnimating = true;

                        var $currPage = $pages.eq( scope.current );

                        var outClass = '', inClass = '';

                        if(scope.current > pageNumber && pageNumber <= pagesCount - 1 ){

                            outClass = 'pt-page-moveToBottom';
                            inClass = 'pt-page-moveFromTop';
                        }else{

                            outClass = 'pt-page-moveToTop';
                            inClass = 'pt-page-moveFromBottom';
                        }

                        if( pageNumber <= pagesCount - 1 ) {

                            scope.current = pageNumber;
                        } else {

                            scope.current = 0;
                        }

                        var $nextPage = $pages.eq( scope.current ).addClass( 'pt-page-current' );

                        $currPage.addClass( outClass ).on( animEndEventName, function() {
                            $currPage.off( animEndEventName );
                            endCurrPage = true;
                            if( endNextPage ) {
                                onEndAnimation( $currPage, $nextPage );
                            }
                        } );

                        $nextPage.addClass( inClass ).on( animEndEventName, function() {
                            $nextPage.off( animEndEventName );
                            endNextPage = true;
                            if( endCurrPage ) {
                                onEndAnimation( $currPage, $nextPage );
                            }
                        } );

                        if( !support ) {
                            onEndAnimation( $currPage, $nextPage );
                        }

                    }

                    function onEndAnimation( $outpage, $inpage ) {
                        endCurrPage = false;
                        endNextPage = false;
                        resetPage( $outpage, $inpage );
                        setTimeout(function(){ isAnimating = false; }, 350);

                    }

                    function resetPage( $outpage, $inpage ) {
                        $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
                        $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
                    }

                    init();

                })(window);


            }



        }
    }
});


