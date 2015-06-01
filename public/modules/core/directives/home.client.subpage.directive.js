angular.module('core').directive('subPage',function(){
    return{
        restrict: 'A',
        replace: true,
        template: '<div id="large-header-{{page}}"  class="pt-page page-{{ 1*$index + 1 }} large-header"> <canvas id="demo-canvas"></canvas><h1 class="main-title"> {{ page }} </h1></div>',
        link: function(scope, element, attrs) {

                var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

                // Main

            if (scope.$first){
                console.log('I am first');
                initHeader();
                initAnimation();
                addListeners();
            }


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


                function initHeader() {

                    width = window.innerWidth;
                    height = window.innerHeight;
                    target = {x: width/2, y: height/2};
                    largeHeader = element[0];
                    largeHeader.style.height = height+'px';

                    canvas = element[0].querySelectorAll("#demo-canvas")[0];
                    canvas.width = width;
                    canvas.height = height;
                    ctx = canvas.getContext('2d');

                    // create points
                    points = [];
                    for(var x = 0; x < width; x = x + width/20) {
                        for(var y = 0; y < height; y = y + height/20) {
                            var px = x + Math.random()*width/20;
                            var py = y + Math.random()*height/20;
                            var p = {x: px, originX: px, y: py, originY: py };
                            points.push(p);
                        }
                    }

                    // for each point find the 5 closest points
                    for(var i = 0; i < points.length; i++) {
                        var closest = [];
                        var p1 = points[i];
                        for(var j = 0; j < points.length; j++) {
                            var p2 = points[j]
                            if(!(p1 == p2)) {
                                var placed = false;
                                for(var k = 0; k < 5; k++) {
                                    if(!placed) {
                                        if(closest[k] == undefined) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }

                                for(var k = 0; k < 5; k++) {
                                    if(!placed) {
                                        if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }
                            }
                        }
                        p1.closest = closest;
                    }

                    // assign a circle to each point
                    for(var i in points) {
                        var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
                        points[i].circle = c;
                    }
                }

                // Event handling
                function addListeners() {
                    if(!('ontouchstart' in window)) {
                        window.addEventListener('mousemove', mouseMove);
                    }
                    window.addEventListener('scroll', scrollCheck);
                    window.addEventListener('resize', resize);
                }

                function mouseMove(e) {
                    var posx =  0;
                    var posy = 0;

                    if (e.pageX || e.pageY) {
                        posx = e.pageX;
                        posy = e.pageY;
                    }
                    else if (e.clientX || e.clientY)    {
                        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    }
                    target.x = posx;
                    target.y = posy;
                }

                function scrollCheck() {
                    if(document.body.scrollTop > height) animateHeader = false;
                    else animateHeader = true;
                }

                function resize() {
                    width = window.innerWidth;
                    height = window.innerHeight;
                    largeHeader.style.height = height+'px';
                    canvas.width = width;
                    canvas.height = height;
                }

                // animation
                function initAnimation() {
                    animate();
                    for(var i in points) {
                        shiftPoint(points[i]);
                    }
                }

                function animate() {
                    if(animateHeader) {
                        ctx.clearRect(0,0,width,height);
                        for(var i in points) {
                            // detect points in range
                            if(Math.abs(getDistance(target, points[i])) < 4000) {
                                points[i].active = 0.3;
                                points[i].circle.active = 0.6;
                            } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                                points[i].active = 0.1;
                                points[i].circle.active = 0.3;
                            } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                                points[i].active = 0.02;
                                points[i].circle.active = 0.1;
                            } else {
                                points[i].active = 0;
                                points[i].circle.active = 0;
                            }

                            drawLines(points[i]);
                            points[i].circle.draw();
                        }
                    }
                    requestAnimationFrame(animate);
                }

                function shiftPoint(p) {
                    TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
                        y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
                        onComplete: function() {
                            shiftPoint(p);
                        }});
                }

                // Canvas manipulation
                function drawLines(p) {
                    if(!p.active) return;
                    for(var i in p.closest) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p.closest[i].x, p.closest[i].y);
                        ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
                        ctx.stroke();
                    }
                }

                function Circle(pos,rad,color) {
                    var _this = this;

                    // constructor
                    (function() {
                        _this.pos = pos || null;
                        _this.radius = rad || null;
                        _this.color = color || null;
                    })();

                    this.draw = function() {
                        if(!_this.active) return;
                        ctx.beginPath();
                        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
                        ctx.fill();
                    };
                }

                // Util
                function getDistance(p1, p2) {
                    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
                }

        }
    }
});


