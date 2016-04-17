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
						templateUrl: 'modules/core/views/home.nav.view.html',
						params: { pageNum: 1 }
					},
					'page': {
						templateUrl: 'modules/core/views/home.index.view.html',
						controller: 'IndexController'
					}
				}
			})
			.state('home.about', {
				url: '/about',
				views: {
					'nav': {
						templateUrl: 'modules/core/views/home.nav.view.html',
						params: { pageNum: 2}
					},
					'page': {
						templateUrl: 'modules/core/views/home.about.view.html',
						controller: 'AboutController'
					}
				}
			})
			.state('home.skill', {
				url: '/skill',
				views: {
					'nav': {
						templateUrl: 'modules/core/views/home.nav.view.html',
						params: { pageNum: 3}
					},
					'page': {
						templateUrl: 'modules/core/views/home.skill.view.html',
						controller: 'SkillController'
					}
				}
			})
			.state('home.experience', {
				url: '/experience',
				views: {
					'nav': {
						templateUrl: 'modules/core/views/home.nav.view.html',
						params: { pageNum: 4}
					},
					'page': {
						templateUrl: 'modules/core/views/home.experience.view.html',
						controller: 'ExperienceController'
					}
				}
			})
			.state('home.contact', {
				url: '/contact',
				views: {
					'nav': {
						templateUrl: 'modules/core/views/home.nav.view.html',
						params: { pageNum: 5}
					},
					'page': {
						templateUrl: 'modules/core/views/home.contact.view.html',
						controller: 'ContactController'
					}
				}
			});
	}
]);
