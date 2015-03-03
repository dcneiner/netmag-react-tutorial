var React = require( "react" );
var $ = require( "jquery" );
var _ = require( "lodash" );

/*
	For the purpose of this application, this is the component
	that will maintain state, make AJAX requests, etc. For
	a production-scale application, I'd highly recommend moving
	these concerns into the Flux architecture model where the
	AJAX requests would be handled out of band, and fed as actions
	into the stores. And then the components would render 
	based on the contents of the stores
*/

var UserRow = require( "UserRow" );
var UserDetail = require( "UserDetail" );

function sortUsers( users, sortOrder ) {
	if ( sortOrder === "asc" ) {
		users.sort( function ( a, b ) {
			return a.id - b.id;
		} );
	} else {
		users.sort( function ( a, b ) {
			return b.id - a.id;
		} );
	}

	return users;
}

var ControllerView = React.createClass({
	getInitialState: function () {
		return {
			loading: true,
			currentUser: null,
			users: [],
			sortOrder: "asc"
		};
	},
	getLatestNames: function () {
		$.ajax({
			url: "/api/names/latest"
		}).then( function ( newUsers ) {
			var users = this.state.users.concat( newUsers );

			this.setState({
				loading: false,
				users: sortUsers( users, this.state.sortOrder )
			});
		}.bind( this ) );
	},
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
	componentWillMount: function () {
		this.getLatestNames();
	},
	renderUsers: function () {
		var users = this.state.users.map( function ( user ) {
			var current = user.id === this.state.currentUser;
			return <UserRow key={user.id} onClick={this.selectUser} current={current} {...user} />;
		}, this );

		return <div>
			<ul className="list-group">{users}</ul>
		</div>;
	},
	renderLoading: function () {
		return "Loading...";
	},
	renderCurrentUser: function () {
		var user = _.find( this.state.users, { id: this.state.currentUser });
		user = _.pick( user, "id", "name", "email");
		return <UserDetail onDisqualify={this.disqualifyUser} {...user} />;
	},
	render: function () {
		var chooseWinnerDisabled = !_.find( this.state.users, { status: "unchosen" } );

		return <div className="container">
			<div className="page-header">
				<h1>React Example <small>winner selection engine</small></h1>
				<button className="btn btn-success" onClick={this.getLatestNames}>Get Latest Names</button>
				{" "}
				<button className="btn btn-primary" onClick={this.chooseWinner} disabled={chooseWinnerDisabled}>Choose a Winner</button>
			</div>
			<div className="row">
				<div className="col col-sm-8">
					{ this.state.loading ? this.renderLoading() : this.renderUsers() }
				</div>
				<div className="col col-sm-4">
					{ this.state.currentUser ? this.renderCurrentUser() : null }
				</div>
			</div>
		</div>;
	}
});

module.exports = ControllerView;