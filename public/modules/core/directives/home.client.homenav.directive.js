angular.module('core').directive('homeNav',function(){
    return{
        restrict: 'A',
        replace: true,
        scope: {
            index: '@',
            page: '@'
        },
        template: '<li data-id="{{index}}"><a>{{page}}</a></li>',
        link: function(scope, element, attrs) {
            // ...
        }
    }
});


