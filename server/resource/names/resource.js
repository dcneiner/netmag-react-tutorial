var fakeData = require( "../../fakeData" );

module.exports = function( host ) {
    return {
        name: "names",
        actions:  {
            latest: {
                method: "get",
                url: "latest",
                topic: "send",
                handle: function( env ) {
                    env.reply({
                        data: fakeData.getPeople( 3 ),
                        statusCode: 200
                    });
                }
            }
        }
    };
};