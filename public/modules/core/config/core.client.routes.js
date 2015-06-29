'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider
			.state('home', {
				abstract: true,
				templateUrl: 'modules/core/views/home.client.view.html',
				controller: 'HomeController'
			})
			.state('home.index', {
				url: '/',
				views: {
					'nav': {
						templateUrl: "modules/core/views/home.nav.view.html",
					},
					'page': {
						templateUrl: "modules/core/views/home.index.view.html",
						controller: 'IndexController'
					}
				}
			})
			.state('home.about', {
				url: '/about',
				template: '<h1>About</h1>',
				controller: 'HomeController'
			})
			.state('home.skill', {
				url: '/skill',
				template: '<h1>Skill</h1>',
				controller: 'HomeController'
			})
			.state('home.experience', {
				url: '/experience',
				template: '<h1>Exp</h1>',
				controller: 'HomeController'
			})
			.state('home.contact', {
				url: '/contact',
				template: '<h1>Contact</h1>',
				controller: 'HomeController'
			});
	}
]);
