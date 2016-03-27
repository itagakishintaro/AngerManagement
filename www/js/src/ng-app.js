var app = angular.module( 'app', [ 'ngRoute', 'controllers', 'services' ] );

app.config( ( $routeProvider ) => {
    $routeProvider
        .when( '/', {
            templateUrl: 'partials/mantra.html',
            controller: 'MantraController'
        } )
        .when( '/mantra', {
            templateUrl: 'partials/mantra.html',
            controller: 'MantraController'
        } )
        .when( '/mantra-input', {
            templateUrl: 'partials/mantra-input.html',
            controller: 'MantraInputController'
        } )
        .when( '/diary', {
            templateUrl: 'partials/diary.html',
            controller: 'DiaryController'
        } )
        .when( '/retrospective', {
            templateUrl: 'partials/retrospective.html',
            controller: 'RetrospectiveController'
        } )
        .when( '/check', {
            templateUrl: 'partials/check.html',
            controller: 'CheckController'
        } )
        .when( '/improve', {
            templateUrl: 'partials/improve.html',
            controller: 'ImproveController'
        } );
} );