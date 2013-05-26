evercookie-mongodb
==================

Small script to get/create mongodb document using an evercookie

## Example

	<script type="text/javascript" src="jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="swfobject-2.2.min.js"></script>
	<script type="text/javascript" src="evercookie.js"></script>
	<script type="text/javascript" src="evercookie-mongodb.js"></script>
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

- put evercookie in its own directory (evercookie.js currently has trouble getting it's required files when it's not in the root directory)
- Fix known issues	

## Known Issues

- it's creating a new document and new evercookie (i think) each time. This obviously defeats the purpose of having evercookie. need to get this fixed asap