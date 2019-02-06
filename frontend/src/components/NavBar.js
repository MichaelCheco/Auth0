import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth'; // instance of the Auth class we created
import logo from '../logo.svg';
const NavBar = props => {
	const signOut = () => {
		auth0Client.signOut();
		props.history.replace('/'); // withRouter gives us access to the history object
	};
	return (
		/* component renders a sign in button or a sign out button 
    depending on if a user is authenticated or not */
		<Wrapper>
			<Nav>
				<Link to="/">Home</Link>
				<Link to="/notes">Notes</Link>
				<Link to="/secured">Protected-Route</Link>
			</Nav>
			{!auth0Client.isAuthenticated() && (
				<Div>
					<Img src={logo} alt="react logo" />
					<Button onClick={auth0Client.signIn}>Sign In</Button>
				</Div>
			)}
			{auth0Client.isAuthenticated() && (
				<Div>
					<h2>{auth0Client.getProfile().name}</h2>
					<Button
						onClick={() => {
							signOut();
						}}
					>
						Sign Out
					</Button>
				</Div>
			)}
		</Wrapper>
	);
};

export default withRouter(NavBar);

const Nav = styled.div`
margin-top: 10px;
	a {
		color: black;
		text-decoration: none;
		margin: 5px;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
		}
	}
`;
const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Button = styled.button`
	width: 90px;
	height: 45px;
	background: palevioletred;
	color: white;
	font-size: 16px;
	cursor: pointer;
	border-radius: 5px;
	outline: none;
	&:hover {
		opacity: 0.7;
	}
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
`;
const Img = styled.img`
	height: auto;
	width: 150px;
`;
