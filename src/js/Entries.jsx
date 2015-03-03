var React = require( "react" );

var EntryRow = require( "EntryRow" );

var Entries = React.createClass({
	propTypes: {
		items: React.PropTypes.array,
		current: React.PropTypes.any,
		onSelected: React.PropTypes.func.isRequired
	},
	render: function () {
		var entries = this.props.items.map( function ( entry ) {
			var current = entry.id === this.props.current;
			var onClick = this.props.onSelected.bind( null, entry.id );
			
			return <EntryRow key={entry.id} onClick={onClick} current={current} {...entry} />;
		}, this );

		return <div>
			<ul className="list-group">{entries}</ul>
		</div>;
	}
});

module.exports = Entries;