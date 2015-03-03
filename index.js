var processes = require( "processhost" )();

processes.setup( {
    "webpack": {
    	command: "./node_modules/.bin/webpack",
    	args: [ "-w" ],
    	restartLimit: 1
    },
    "autohost": {
    	command: "node",
    	args: [ "./server/index.js" ],
    	restartLimit: 5
    }
} );


processes.start( "webpack" );
processes.start( "autohost" );