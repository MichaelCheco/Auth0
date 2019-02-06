import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth'; // instance of the Auth class we created

const NavBar = props => {
	const signOut = () => {
		auth0Client.signOut();
		props.history.replace('/'); // withRouter gives us access to the history object
	};
	return (
		/* component renders a sign in button or a sign out button 
    depending on if a user is authenticated or not */
		<div>
			<Link to="/">Home</Link>
			<Link to="/notes">Notes</Link>
			<Link to="/secured">Protected Route</Link>
			{!auth0Client.isAuthenticated() && (
				<button onClick={auth0Client.signIn}>Sign In</button>
			)}
			{auth0Client.isAuthenticated() && (
				<div>
					<h2>{auth0Client.getProfile().name}</h2>
					<button
						onClick={() => {
							signOut();
						}}
					>
						Sign Out
					</button>
				</div>
			)}
		</div>
	);
};

export default withRouter(NavBar);
