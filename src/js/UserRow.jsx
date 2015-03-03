var React = require( "react" );
var classNames = require( "classnames" );

var UserRow = React.createClass({
	propTypes: {
		id: React.PropTypes.number.isRequired,
		onSelected: React.PropTypes.func.isRequired,
		name: React.PropTypes.string,
		current: React.PropTypes.bool
	},
	getDefaultProps: function () {
		return {
			current: false
		};
	},
	onClick: function () {
		if ( this.props.status !== "disqualified" ) {
			this.props.onSelected( this.props.id );
		}
	},
	render: function () {
		var classes = classNames( "list-group-item", {
			active: this.props.current,
			disabled: this.props.status === "disqualified",
			"list-group-item-success": this.props.status === "winner"
		});

		return <li className={classes} onClick={this.onClick}>
			{this.props.name}
		</li>;
	}
});

module.exports = UserRow;