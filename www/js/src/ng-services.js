var services = angular.module( 'services', [] );

class Mantra {
    show( $location ) {
        if ( lsFind( 'mantras' ).length > 0 ) {
            var newestMantra = lsFind( 'mantras' )[ 0 ].mantra;
            $( '#mantra' ).html( convertLFtoBR( newestMantra ) );
        } else {
            $location.path( '/mantra-input' );
        }
    }

    save() {
        var mantra = lsFind( 'mantras' );
        lsSave( 'mantras', getMantra() );
    }
}
services.service( 'Mantra', Mantra );

class Diary {
    save( $scope, $sce ) {
        lsSave( 'angerlogs', getAngerLog() );
        this.addLog( $scope, $sce );
        moveTo( $( '#record' ) );
    }

    addLog( $scope, $sce ) {
        var logs = getAngerLogsForView();
        logs.forEach( ( log ) => {
            log.angerLevelIcon = $sce.trustAsHtml( log.angerLevelIcon );
        } );
        $scope.logs = logs;
    }
}
services.service( 'Diary', Diary );

class Retrospective {
    save( $scope ) {
        lsSave( 'kpts', getKpt() );
        this.addKpt( $scope );
        moveTo( $( '#record' ) );
    }

    addKpt( $scope ) {
        $scope.kpts = lsFind( 'kpts' );
    }
}
services.service( 'Retrospective', Retrospective );

class Check {
    constructor() {
        this.answer = {};
    }

    init( index ) {
        var answerValue = this.answer[ index ];
        if ( answerValue ) {
            $( 'input[name="answer"]' )[ Number( answerValue ) - 1 ].checked = true;
        } else {
            $( 'input[name="answer"]:checked' ).attr( 'checked', false );
        }
    }

    setAnswer( index ) {
        if ( $( 'input[name="answer"]:checked' ).val() ) {
            this.answer[ index ] = $( 'input[name="answer"]:checked' ).val();
            return true;
        } else {
            $( '#alert' ).openModal();
            return false;
        }
    }

    eval() {
        var point = [];
        factors.forEach( ( element, index ) => {
            point[ index ] = 0;
        } );

        questionnarire.forEach( ( q, index ) => {
            if ( q.reverse ) {
                var MAX_VAL = 5;
                point[ q.factor ] += Number( MAX_VAL + 1 - this.answer[ index ] );
            } else {
                point[ q.factor ] += Number( this.answer[ index ] );
            }
        } );

        lsSave( 'points', {
            'datetime': new XDate(),
            'point': point
        } );
    }

    gotoImprove( $location ) {
        $location.path( '/improve' );
    }
}
services.service( 'Check', Check );

class Improve {
    init( $scope ) {
        $scope.points = lsFind( 'points' );
        $scope.factors = factors;
        $scope.averages = averages;
        $scope.sum = sum;
    }
}
services.service( 'Improve', Improve );