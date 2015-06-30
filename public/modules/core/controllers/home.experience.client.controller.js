'use strict';


angular.module('core').controller('ExperienceController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
        $scope.current = 4;
    }
]);
