
(function($, window, undefined){

    var EverMongo = function(element, options) {
        this.init(element, options);
    };

    EverMongo.prototype = {
        constructor: EverMongo,
        init: function(element, options) {
            var that = this;
            that.options = $.extend({}, $.fn.everMongo.defaults, options);
            that.ec = new evercookie();
            that.evercookieID = null;
            that.mongoData = null;
            that.mongoFullUrl = that.options.mongoUrl + 'databases/' + that.options.db + '/collections/' + that.options.collection + '/';
            that.run();
            return that;
        },
        run: function(){
            var that = this;
            var create = 0;
            that.ec.get("uid", function(best, all) {
                if (typeof best == "undefined") {
                    create = 1;
                } else {
                    that.evercookieID = best;
                }
                that.getMongoData(create);
            }, 0);
        },
        getMongoData: function(create) {
            var that = this;
            if (that.mongoData) return that.mongoData;
        
            if (create) {
                that.newMongoDoc( function(data) {
                    that.setMongoData(that, data)
                });
            } else {
                // use EID to get info
                that.getMongoDataByEID( function(data) {
                    that.setMongoData(that, data);
                });
            }
        },
        newMongoDoc: function(callback) {
            var that = this;
            $.ajax({ 
                url: that.mongoFullUrl + '?apiKey=' + that.options.apiKey,
                data: JSON.stringify( that.options.defaultData ),
                type: "POST",
                contentType: "application/json",
                success: callback
            });
        },
        setMongoData: function(that, mongoData) {
            that.mongoData = mongoData;
            if (!that.evercookieID && mongoData._id.$oid) {
                that.evercookieID = mongoData._id.$oid;
                that.ec.set("eid", that.evercookieID);
            }
            if (typeof that.options.completeCallback == "function") {
                that.options.completeCallback( that.mongoData, that.evercookieID );
            }
        },
        getMongoDataByEID: function(callback) {
            var that = this;
            $.ajax({ 
                url: that.mongoFullUrl + that.evercookieID + '?apiKey=' + that.options.apiKey,
                type: "GET",
                contentType: "application/json",
                success: callback
            });
        }
    };


    // define plugin
    $.fn.everMongo = function( options ) {
        return this.each( function () {
            new EverMongo(this, options);
        });
    };

    $.fn.everMongo.constructor = EverMongo;

    // define defaults
    $.fn.everMongo.defaults = {
        apiKey: '',
        db: '',
        collection: '',
        defaultData: { "testing": "1,2" },
        mongoUrl: 'https://api.mongolab.com/api/1/',
        completeCallback: function(mongoData, evercookieID){
            console.log(mongoData, evercookieID);
        }
    };
    
})(jQuery, this);