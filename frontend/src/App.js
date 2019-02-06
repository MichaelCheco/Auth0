import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import axios from 'axios';
import { Route, withRouter } from 'react-router-dom';
import Notes from './components/Notes';
import Callback from './components/Callback';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import ProtectedPage from './components/ProtectedPage';
import auth0Client from './Auth';
class App extends Component {
	state = {
		notes: [],
		checkingSession: true,
	};
	componentDidMount = async () => {
		await axios
			.get('http://localhost:8081/api/notes')
			.then(res => this.setState({ notes: res.data }));
		console.log(this.state.notes, 'NOTES');
		if (this.props.location.pathname === '/callback') {
			this.setState({ checkingSession: false });
			return;
		}
		try {
			/* app tries a silentAuth and calls forceUpdate
       so users can see whatever they asked for */
			await auth0Client.silentAuth();
			this.forceUpdate();
		} catch (err) {
			if (err.error !== 'login_required') console.log(err.error);
		}
		this.setState({ checkingSession: false });
	};

	render() {
		return (
			<div className="App">
				<NavBar />
				<Route
					path="/notes"
					render={() => <Notes notes={this.state.notes} />}
				/>
				<Route exact path="/callback" component={Callback} />
				<SecuredRoute
					path="/secured"
					component={ProtectedPage}
					checkingSession={this.state.checkingSession}
				/>
			</div>
		);
	}
}

export default withRouter(App);
/* withRouter allows us to see what route is 
being called (this.props.location.pathname) */
