var React = require( "react" );
var classNames = require( "classnames" );

var EntryRow = React.createClass({
	propTypes: {
		id: React.PropTypes.number.isRequired,
		onClick: React.PropTypes.func.isRequired,
		name: React.PropTypes.string,
		current: React.PropTypes.bool
	},	
	getDefaultProps: function () {
		return {
			current: false
		};
	},
	render: function () {
		var classes = "list-group-item";

		var onClick;

		if ( this.props.status !== "disqualified" ) {
			onClick = this.props.onClick;
		}

		return <li className={classes} onClick={onClick}>
			{this.props.name}
		</li>;
	}
});

module.exports = EntryRow;