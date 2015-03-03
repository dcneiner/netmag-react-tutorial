var React = require( "react" );

var PageHeader = React.createClass({
	render: function (){
		return <div className="page-header">
			<h1>{this.props.title} { this.props.subtitle ? <small>{this.props.subtitle}</small> : null }</h1>
			{this.props.children}
		</div>;
	}
});

module.exports = PageHeader;