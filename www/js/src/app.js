// ---------- Local Strage ----------
var lsSave = ( datasetName, data ) => {
    var dataset = lsFind( datasetName );
    dataset.push( data );
    localStorage.setItem( datasetName, JSON.stringify( dataset ) );
};

var lsFind = ( datasetName ) => {
    if ( localStorage.getItem( datasetName ) ) {
        var dataset = JSON.parse( localStorage.getItem( datasetName ) );
        return objectArraySort( dataset, 'datetime' );
    } else {
        return [];
    }
};

// ---------- INITIALIZE ----------
var initMenu = () => {
    $( ".button-collapse" ).sideNav( {
        closeOnClick: true
    } );
};

var initMantraArea = () => {
    $( '#mantra' ).css( 'height', $( window ).height() - $( '#menu' ).height() );
};

var initMaterialSelect = () => {
    $( 'select' ).material_select();
};

var initColorbox = () => {
    $( '.modal-positive-trigger' ).colorbox( {
        href: 'partials/modal-positive.html'
    } );
    $( '.modal-negative-trigger' ).colorbox( {
        href: 'partials/modal-negative.html'
    } );
};

// ---------- VIEW ----------
var getMantra = () => {
    var mantra = {};
    mantra.datetime = new XDate();
    mantra.mantra = $( '#mantraInput' ).val();
    return mantra;
};

var getAngerLog = () => {
    var angerLog = {};
    angerLog.angerLevel = $( '#angerLevel' ).val();
    angerLog.situation = $( '#situation' ).val();
    angerLog.feel = $( '#feel' ).val();
    angerLog.action = $( '#action' ).val();
    angerLog.try = $( '#try' ).val();
    angerLog.think = $( '#think' ).val();
    angerLog.datetime = new XDate();
    return angerLog;
};

var getAngerLogsForView = () => {
    var logs = lsFind( 'angerlogs' );
    logs.forEach( ( log ) => {
        log.datetime = new XDate( log.datetime ).toString( 'yyyy/MM/dd HH:mm' );
        log.angerLevelIcon = '';
        for ( var i = 1; i <= Number( log.angerLevel ); i++ ) {
            log.angerLevelIcon += '<i class="fa fa-heartbeat anger-level-icon"></i>';
        }
        if ( log.angerLevel === '2' ) {
            log.color = 'orange accent-1';
        } else if ( log.angerLevel === '3' ) {
            log.color = 'orange accent-2';
        } else if ( log.angerLevel === '4' ) {
            log.color = 'orange accent-3';
        } else {
            log.color = '';
        }
    } );
    return logs;
};

var getKpt = () => {
    var kpt = {};
    kpt.keep = $( '#keep' ).val();
    kpt.problemm = $( '#problemm' ).val();
    kpt.try = $( '#try' ).val();
    kpt.datetime = new XDate();
    return kpt;
};