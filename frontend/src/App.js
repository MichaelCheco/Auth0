import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import axios from 'axios';
class App extends Component {
	state = {
		notes: [],
	};
	componentDidMount = async () => {
		await axios
			.get('http://localhost:8081/api/notes')
			.then(res => this.setState({ notes: res.data }));
		console.log(this.state.notes, 'NOTES');
	};

	render() {
		return (
			<div className="App">
				<NavBar />
			</div>
		);
	}
}

export default App;
