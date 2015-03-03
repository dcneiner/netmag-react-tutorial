var React = require( "react" );
var $ = require( "jquery" );
var _ = require( "lodash" );

/*
	For the purpose of this example, this is the component
	that will maintain state, make AJAX requests, etc. For
	a production-scale applications, I'd highly recommend moving
	these concerns into the Flux architecture model where the
	AJAX requests would be handled out of band, and fed as actions
	into the stores. And then the components would render 
	based on the contents of the stores
*/

// Custom Components
var PageHeader = require( "PageHeader" );
var Entries = require( "Entries" );
var EntryDetail = require( "EntryDetail" );

var ControllerView = React.createClass({
	getInitialState: function () {
		return {
			loading: true,
			currentEntry: null,
			entries: []
		};
	},

	// AJAX Requests (In a Flux app, this would live upstream of the stores)
	getLatestEntries: function () {
		$.ajax({
			url: "/api/entries/latest"
		}).then( function ( newEntries ) {
			var entries = this.state.entries.concat( newEntries );

			this.setState({
				loading: false,
				entries: entries
			});
		}.bind( this ) );
	},

	// Actions (in a Flux app, these would live in the stores)
	disqualifyEntry: function ( id ) {
		var entries = this.state.entries;
		var entry = _.find( entries, { id: id } );
		entry.status = "disqualified";
		this.setState({
			currentEntry: null,
			entries: entries
		});
	},
	selectEntry: function ( id ) {
		var currentId = this.state.currentEntry;
		this.setState({ currentEntry: currentId === id ? null : id });
	},
	chooseWinner: function () {
		var entries = this.state.entries;
		var possible = _.filter( this.state.entries, { status: "unchosen" } );
		var rand;

		if ( possible.length ) {
			rand = _.random( possible.length - 1 );
			possible[ rand ].status = "winner";

			this.setState({
				currentEntry: possible[ rand ].id,
				entries: entries
			});
		}
	},

	// Lifecycle Methods
	componentWillMount: function () {
		this.getLatestEntries();
	},

	// Rendering Helpers
	renderCurrentEntry: function () {
		if ( this.state.currentEntry ) {
			var entry = _.find( this.state.entries, { id: this.state.currentEntry });
			return <EntryDetail onDisqualify={this.disqualifyEntry} {...entry} />;
		}
	},

	renderEntries: function () {
		if ( this.state.loading ) {
			return "Loading...";
		} else {
			return <Entries items={this.state.entries} current={this.state.currentEntry} onSelected={this.selectEntry} />;
		}
	},

	// Actual render call
	render: function () {
		var chooseWinnerDisabled = !_.find( this.state.entries, { status: "unchosen" } );

		return <div className="container">
			<PageHeader title="React Example" subtitle="winner selection engine">
				<div className="btn-group">
					<button className="btn btn-primary" onClick={this.getLatestEntries}>Get Latest Entries</button>
					<button className="btn btn-success" onClick={this.chooseWinner} disabled={chooseWinnerDisabled}>Choose a Winner</button>
				</div>
			</PageHeader>
			<div className="row">
				<div className="col col-sm-8">{ this.renderEntries() }</div>
				<div className="col col-sm-4">{ this.renderCurrentEntry() }</div>
			</div>
			<footer>
				<p>
					This is a simple React example project 
					created to accompany an article published 
					in <a href="http://netmagazine.com">net magazine</a>.<br />
					<a href="comp.html">View the static comp &rarr;</a>
				</p>
			</footer>
		</div>;
	}
});

module.exports = ControllerView;