var faker = require( "faker" );
var _ = require( "lodash" );

module.exports = {
	getEntries: function ( count ) {

		// A simple (aka naive) mechanism to get ascending ID's
		// that will be unique enough for this example app
		var idIncrement = +(new Date());

		return _.times( count, function () {
			return {
				id: idIncrement++,
				name: [ faker.name.firstName(), faker.name.lastName() ].join( " " ),
				email: faker.internet.email().replace( /@(.+)$/, "@example.com" ),
				status: "unchosen"
			};
		} );
	}
};