var React = require( "react" );

var UserDetail = React.createClass({
	propTypes: {
		id: React.PropTypes.number.isRequired,
		onDisqualify: React.PropTypes.func.isRequired,
		name: React.PropTypes.string,
		email: React.PropTypes.string
	},
	onDisqualifyClick: function () {
		this.props.onDisqualify( this.props.id );
	},
	render: function () {
		return <div>
			<h2>{this.props.name}</h2>
			<p><a href={"mailto:" + this.props.email}>{this.props.email}</a></p>
			<div>
				<button className="btn btn-warning" onClick={this.onDisqualifyClick}>Disqualify</button>
			</div>
		</div>;
	}
});

module.exports = UserDetail;