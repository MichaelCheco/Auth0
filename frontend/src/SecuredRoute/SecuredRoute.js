import React from 'react';
import { Route } from 'react-router-dom';
import auth0Client from '../Auth';

const SecuredRoute = props => {
	// path helps us configure our Route
	// Component tells us what to render in case the user is authenticated
	const { component: Component, path } = props;
	return (
		<Route
			path={path}
			render={() => {
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
