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
var UserRow = require( "UserRow" );
var UserDetail = require( "UserDetail" );

var ControllerView = React.createClass({
	getInitialState: function () {
		return {
			loading: true,
			currentUser: null,
			users: []
		};
	},

	// AJAX Requests (In a Flux app, this would live upstream of the stores)
	getLatestNames: function () {
		$.ajax({
			url: "/api/names/latest"
		}).then( function ( newUsers ) {
			var users = this.state.users.concat( newUsers );

			this.setState({
				loading: false,
				users: users
			});
		}.bind( this ) );
	},

	// Actions (in a Flux app, these would live in the stores)
	disqualifyUser: function ( id ) {
		var users = this.state.users;
		var user = _.find( users, { id: id } );
		user.status = "disqualified";
		this.setState({
			currentUser: null,
			users: users
		});
	},
	selectUser: function ( id ) {
		var currentId = this.state.currentUser;
		this.setState({ currentUser: currentId === id ? null : id });
	},
	chooseWinner: function () {
		var users = this.state.users;
		var possible = _.filter( this.state.users, { status: "unchosen" } );
		var rand;

		if ( possible.length ) {
			rand = _.random( possible.length - 1 );
			possible[ rand ].status = "winner";

			this.setState({
				currentUser: possible[ rand ].id,
				users: users
			});
		}
	},

	// Lifecycle Methods
	componentWillMount: function () {
		this.getLatestNames();
	},

	// Rendering Helpers
	renderUsers: function () {
		var users = this.state.users.map( function ( user ) {
			var current = user.id === this.state.currentUser;
			return <UserRow key={user.id} onSelected={this.selectUser} current={current} {...user} />;
		}, this );

		return <div>
			<ul className="list-group">{users}</ul>
		</div>;
	},
	renderCurrentUser: function () {
		var user = _.find( this.state.users, { id: this.state.currentUser });
		return <UserDetail onDisqualify={this.disqualifyUser} {...user} />;
	},

	// Actual render call
	render: function () {
		var chooseWinnerDisabled = !_.find( this.state.users, { status: "unchosen" } );

		return <div className="container">
			<PageHeader title="React Example" subtitle="winner selection engine">
				<div className="btn-group">
					<button className="btn btn-success" onClick={this.getLatestNames}>Get Latest Names</button>
					<button className="btn btn-primary" onClick={this.chooseWinner} disabled={chooseWinnerDisabled}>Choose a Winner</button>
				</div>
			</PageHeader>
			<div className="row">
				<div className="col col-sm-8">
					{ this.state.loading ? "Loading..." : this.renderUsers() }
				</div>
				<div className="col col-sm-4">
					{ this.state.currentUser ? this.renderCurrentUser() : null }
				</div>
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