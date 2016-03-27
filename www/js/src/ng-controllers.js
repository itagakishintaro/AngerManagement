var controllers = angular.module( 'controllers', [] );

app.controller( 'MenuController', [ '$scope', ( $scope ) => {
    $scope.$on( '$includeContentLoaded', ( event ) => {
        initMenu();
    } );
} ] );

app.controller( 'MantraController', [ '$scope', '$location', 'Mantra', ( $scope, $location, Mantra ) => {
    angular.element( document ).ready( () => {
        initMantraArea();
        Mantra.show( $location );
    } );
} ] );

app.controller( 'MantraInputController', [ '$scope', '$location', 'Mantra', ( $scope, $location, Mantra ) => {
    $scope.save = () => {
        Mantra.save();
        $location.path( '/mantra' );
    };
} ] );

app.controller( 'DiaryController', [ '$scope', '$sce', 'Diary', ( $scope, $sce, Diary ) => {
    Diary.addLog( $scope, $sce );
    angular.element( document ).ready( () => {
        initMaterialSelect();
    } );
    $scope.save = () => {
        Diary.save( $scope, $sce );
    };
    $scope.moveTo = ( e ) => {
        moveTo( $( e.target ).next( 'label' ) );
    };
} ] );

app.controller( 'RetrospectiveController', [ '$scope', 'Retrospective', ( $scope, Retrospective ) => {
    Retrospective.addKpt( $scope );
    angular.element( document ).ready( () => {
        initColorbox();
    } );
    $scope.save = () => {
        Retrospective.save( $scope );
    };
    $scope.moveTo = ( e ) => {
        moveTo( $( e.target ).next( 'label' ) );
    };
} ] );

app.controller( 'CheckController', [ '$scope', '$location', 'Check', ( $scope, $location, Check ) => {
    $scope.index = 0;
    $scope.MAX_INDEX = questionnarire.length - 1;
    $scope.questionnarire = questionnarire;

    $scope.next = () => {
        if ( Check.setAnswer( $scope.index ) ) {
            $scope.index += 1;
            Check.init( $scope.index );
        }
    };
    $scope.prev = () => {
        $scope.index -= 1;
        Check.init( $scope.index );
    };
    $scope.done = () => {
        if ( Check.setAnswer( $scope.index ) ) {
            Check.eval();
            Check.gotoImprove( $location );
        }
    };
} ] );

app.controller( 'ImproveController', [ '$scope', 'Improve', ( $scope, Improve ) => {
    Improve.init( $scope );
} ] );