evercookie-mongodb
==================

Small script to get/create mongodb document using an evercookie

## Example

	<script type="text/javascript" src="/evercookie/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="/evercookie/swfobject-2.2.min.js"></script>
	<script type="text/javascript" src="/evercookie/evercookie.js"></script>
	<script type="text/javascript" src="/evercookie-mongodb.js"></script>
	<script type="text/javascript">
	    var options = {
	        apiKey: '50f47f5fe4b0b9deb2482c6b',
	        db: 'evercookie-mongodb',
	        collection: 'userData',
	        completeCallback: function(mongoData, evercookieID) {
	            $('#content').html( "mongodb data: " + JSON.stringify(mongoData) );
	            $('#cookie').html( "evercookie's uid: " + evercookieID )
	        }
	    }
	    $('body').everMongo(options);
	</script>


## TODO

- Fix known issues

## Known Issues

- it's creating a new document and new cookie (i think) everytime. This is obviously not what we want...
