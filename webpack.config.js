console.log( require.resolve( "react/dist/react-with-addons" ) );
module.exports = {
	entry: "./src/js/app.jsx",
	output: {
		path: __dirname + "/server/public/js",
		filename: "main.js"
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx" },
			{ 
				test: require.resolve( "react/dist/react-with-addons" ), 
				loader: "expose?React" 
			}
		]
	}, 
	resolve: {
		root: __dirname + "/src/js",
		alias: {
			react: "react/dist/react-with-addons"
		},
		extensions: [ "", ".webpack.js", ".web.js", ".js", ".jsx" ]
	}
}