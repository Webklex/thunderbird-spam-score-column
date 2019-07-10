function getSpamScore ( aHdr ) {
    var score = parseFloat(aHdr.getStringProperty("x-spam-score"));

    // Fall-back to parsing X-Spam-Status if X-Spam-Score isn't valid.
    if ( isNaN(score) ){
        var header = aHdr.getStringProperty("x-spam-status");
        var match = header.match(/ score=(-?[0-9]+\.?[0-9]*) /);
        var score = parseFloat(( match != null ) ? match[1] : "");
    }

    // Return nothing if we somehow have a non-number.
    if ( isNaN(score) )
        return "";

    return score.toFixed(3);
}

var ColumnHandler = {
    isString: function ( ) { return false; },

    getCellText: function ( aRow, aCol ) {
        return getSpamScore(gDBView.getMsgHdrAt(aRow));
    },
    getCellProperties: function(aRow, col, props){
	var score = getSpamScore(gDBView.getMsgHdrAt(aRow));
	return score > 6 ? "SpamAlert" : "SpamOK";
    },

    getSortLongForRow: function ( aHdr ) {
        // Good for scores above -1000000.000 (Negative one million.)
        return (parseFloat(getSpamScore(aHdr)) * 1000) + 10000000000;
    },
};

var CreateDBObserver = {
    observe: function ( aMsgFolder, aTopic, aData ) {
        gDBView.addColumnHandler("colSpamScore", ColumnHandler);
    },
};

function doOnceLoaded ( ) {
    var observer_service = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
    observer_service.addObserver(CreateDBObserver, "MsgCreateDBView", false);

    // Add the headers we want to the DB list if they're not present.
    var user_prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    var headers = ["x-spam-score", "x-spam-status"];
    for ( var hdr = 0 ; hdr < headers.length ; hdr++ ) {
        var db_headers = user_prefs.getCharPref("mailnews.customDBHeaders");
        if ( db_headers.split(" ").indexOf(headers[hdr]) == -1 )
            user_prefs.setCharPref("mailnews.customDBHeaders", (db_headers + " " + headers[hdr]).trim());
    }
};

window.addEventListener("load", doOnceLoaded, false);
