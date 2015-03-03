var fakeData = require( "../../fakeData" );

module.exports = function( host ) {
    return {
        name: "entries",
        actions:  {
            latest: {
                method: "get",
                url: "latest",
                topic: "send",
                handle: function( env ) {
                    env.reply({
                        data: fakeData.getEntries( 3 ),
                        statusCode: 200
                    });
                }
            }
        }
    };
};