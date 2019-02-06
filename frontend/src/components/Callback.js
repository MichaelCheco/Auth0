import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../Auth';
class Callback extends Component {
	componentDidMount = async () => {
		// fetch the user information sent by Auth0
		await auth0Client.handleAuthentication();
		// redirect users to homepage after authenticating
		this.props.history.replace('/');
	};

	render() {
		return (
			<div>
				<p>Loading Profile 🚀</p>
			</div>
		);
	}
}

export default withRouter(Callback);
