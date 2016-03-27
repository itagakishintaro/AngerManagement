var objectArraySort = ( array, prop ) => {
    return array.sort( ( a, b ) => {
        if ( a[ prop ] < b[ prop ] ) {
            return 1;
        } else if ( a[ prop ] > b[ prop ] ) {
            return -1;
        } else {
            return 0;
        }
    } );
};

var moveTo = ( target ) => {
    const TARGET_OFFSET = target.offset().top;
    $( 'html,body' ).animate( {
        scrollTop: TARGET_OFFSET
    }, 500 );
};

var convertLFtoBR = ( text ) => {
    return text.replace( /\r?\n/g, '<br>' );
};

var sum = ( array ) => {
    return array.reduce( ( pre, val ) => {
        return ( pre + val );
    } );
};