
(function($, window, undefined){

    var APIKEY = '?apiKey=50f47f5fe4b0b9deb2482c6b';
    var MONGODB = 'evercookie-mongodb';
    var MONGOCOLLECTION = 'userData';
    var MONGOURL = 'https://api.mongolab.com/api/1/databases/'+MONGODB+'/collections/'+MONGOCOLLECTION+'/';
    var EC = new evercookie();
    var EID;
    var MONGODATA;    
    
    function init() {
        var create = 0;
        EC.get("uid", function(best, all) {
            if (typeof best == "undefined") {
                create = 1;
            } else {
                EID = best;
            }
            getMongoData(create);
        }, 0);
    };
    
    function getMongoData(create) {
        if (MONGODATA) return MONGODATA;
        
        if (create) {
            newMongoDoc(setMongoData)
        } else {
            // use EID to get info
            getMongoDataByEID(function(data){
                setMongoData(data);
            });
        }
    }
    
    function getMongoDataByEID(callback) {
        $.ajax({ 
            url: MONGOURL + EID + APIKEY,
            type: "GET",
            contentType: "application/json",
            success: callback
        });
    }
    
    function setMongoData(data) {
        MONGODATA = data;
        if (typeof EID == "undefined") {
            EID = data._id.$oid;
            EC.set("uid",EID);
        }
        if (typeof evercookieMongoCallback == "function") {
            evercookieMongoCallback( MONGODATA, EID )
        }
    }
    
    function newMongoDoc(callback) {
        $.ajax({ 
            url: MONGOURL + APIKEY,
            data: JSON.stringify( { "yup" : "ok" } ),
            type: "POST",
            contentType: "application/json",
            success: callback
        });
    }
    
    // start the maddness
    init();
    
})(jQuery, this);