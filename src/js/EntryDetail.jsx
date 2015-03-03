var React = require( "react" );

var EntryDetail = React.createClass({
	propTypes: {
		id: React.PropTypes.number.isRequired,
		onDisqualify: React.PropTypes.func.isRequired,
		name: React.PropTypes.string,
		email: React.PropTypes.string
	},
	render: function () {
		return <div>
			<h2>{this.props.name}</h2>
			<p><a href={"mailto:" + this.props.email}>{this.props.email}</a></p>
			<div>
				<button className="btn btn-warning" onClick={ this.props.onDisqualify.bind(null,this.props.id) }>Disqualify</button>
			</div>
		</div>;
	}
});

module.exports = EntryDetail;