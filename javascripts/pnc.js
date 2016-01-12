(function(angular) {

	alert('URLS ARE LOADING');
	
	
	
	
	var app = angular.module('app', [ 'ngRoute', 'ngAnimate', 'ngTouch' ]);
	
	var appUIState = {
		expanded : false
	};
	
	app.factory("uiState",function($timeout){
        return appUIState;
	});
	
	
	app.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			template : function(params) {
				appUIState.expanded = false;
				//return "../partials/onboarding/loan.html";
				alert("Attempt to route...");
				return "worked??";
			},
			reloadOnSearch : false
		})
		.when('/cmt/:section', {
			template : function(params) {
				appUIState.expanded = false;
				
				alert("Attempt to route..."+params['section']);
				
				return "../partials/" + params['section'] + ".html";
			},
			reloadOnSearch : false
		})
		.when('/onboarding/:section',{
			templateUrl : function(params) {
				appUIState.expanded = false;
				return "../partials/onboarding" + params['section'] + ".html";
			},
			reloadOnSearch : false
		})
		.otherwise({
			redirectTo : function(params, path, search) {
				return "/cmt/dashboard";
			}
		});
		$locationProvider.html5Mode({
			enabled : true,
			requireBase : false
		});
	});

	app.controller('UIController', function($scope, $timeout, $location, $sce, $templateRequest, uiState) {
		
		alert("Controller loaded");
		
		
//		var templateUrl = $sce.getTrustedResourceUrl('../partials/dashboard.html');
//
//	    $templateRequest(templateUrl).then(function(template) {
//	        alert('Tmpl loaded');
//	    }, function(er) {
//	        alert('Error : '+er)
//	    });
		
		
		
		var module = this;
		$scope.uiState = uiState;
		function currentSection() {
			var currentSection = $location.path().substring(5); // /cmt/<section>
			var menuItems = $('.menuItem a');
			var current;
			var currentIndex;
			for(var i=0; i<menuItems.length; i++) {
				if($(menuItems[i]).attr('href') == currentSection) {
					console.log("Index = "+i);
					currentIndex = i;
					current = $(menuItems[i]);
					break;
				}
			}
			var prevIndex = currentIndex-1;
			if(prevIndex < 0) {
				prevIndex = menuItems.length - 1;
			}
			var nextIndex = currentIndex+1;
			if(nextIndex >=  menuItems.length) {
				nextIndex = 0;
			}
			return {
				prevIndex: prevIndex,
				nextIndex: nextIndex,
				prevURI: '/cmt/'+$(menuItems[prevIndex]).attr('href'),
				nextURI: '/cmt/'+$(menuItems[nextIndex]).attr('href')
				
			}
		}
		
		$scope.previousSection = function() {
			$location.path(currentSection().prevURI);
		}
		
		$scope.nextSection = function() {
			$location.path(currentSection().nextURI);
		}
		
	});

	angular.bootstrap(document, [ 'app' ]);

})(angular);