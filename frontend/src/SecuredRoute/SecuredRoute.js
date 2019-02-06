import React from 'react';
import { Route } from 'react-router-dom';
import auth0Client from '../Auth';

const SecuredRoute = props => {
	// path helps us configure our Route
	// Component tells us what to render in case the user is authenticated
	// checkingSession is a boolean that will validate the session
	const { component: Component, path, checkingSession } = props;
	return (
		<Route
			path={path}
			render={() => {
				if (checkingSession) return <h3>Validating Session ... 🚀</h3>;
				if (!auth0Client.isAuthenticated()) {
					auth0Client.signIn();
					return <div />;
				}
				return <Component />;
			}}
		/>
	);
};

export default SecuredRoute;
