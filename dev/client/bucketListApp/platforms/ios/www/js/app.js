angular.module('quickTasks', ['ionic', 'quickTasks.controllers', 'quickTasks.services'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('auth', {
                url: "/auth",
                abstract: true,
                templateUrl: "templates/auth.html"
            })
            .state('auth.signin', {
                url: '/signin',
                views: {
                    'auth-signin': {
                        templateUrl: 'templates/auth-signin.html',
                        controller: 'SignInCtrl'
                    }
                }
            })
            .state('auth.signup', {
                url: '/signup',
                views: {
                    'auth-signup': {
                        templateUrl: 'templates/auth-signup.html',
                        controller: 'SignUpCtrl'
                    }
                }
            })
            .state('provider', {
                url: "/bucket",
                abstract: true,
                templateUrl: "templates/profile.html"
            })
            .state('provider.profile', {
                url: '/profile',
                views: {
                    'view-profile': {
                        templateUrl: 'templates/viewProfile.html',
                        controller: 'myListCtrl'
                    }
                }
            })
            .state('provider.completed', {
                url: '/completed',
                views: {
                    'bucket-completed': {
                        templateUrl: 'templates/bucket-completed.html',
                        controller: 'completedCtrl'
                    }
                }
            })
            .state('search', {
                url: "/search",
                abstract: true,
                templateUrl: "templates/search.html"
            })
            .state('search.customers', {
                url: '/customers',
                views: {
                    'search-results': {
                        templateUrl: 'templates/search-customers.html',
                        controller: 'searchCustomersCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/auth/signin');
    });