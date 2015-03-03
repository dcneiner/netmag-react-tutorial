var host = require( "autohost" );

host.init( {
	"static": __dirname + "/public",
	resources: __dirname + "/resource",
	port: 8080,
	websocket: false
} );


console.log( "Open your browser to http://localhost:8080/" )
console.log( "to run this example application." );
console.log( "" ); 