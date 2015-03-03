module.exports = {
	entry: "app.jsx",
	output: {
		path: __dirname + "/server/public/js",
		filename: "main.js"
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx" },
			{ test: require.resolve( "react" ), loader: "expose?React" }
		]
	}, 
	resolve: {
		root: __dirname + "/src/js",
		extensions: [ "", ".webpack.js", ".web.js", ".js", ".jsx" ]
	}
}