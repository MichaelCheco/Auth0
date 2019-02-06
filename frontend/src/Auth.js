import auth0 from 'auth0-js';

class Auth {
	constructor() {
		this.auth0 = new auth0.WebAuth({
			// creating an instance of auth0.webAuth with Auth0 values and other configs
			// the following three lines MUST be updated
			domain: 'michael-checo.auth0.com',
			audience: 'https://michael-checo.auth0.com/userinfo',
			clientID: 'ptuSIw3z5H8hnAx8MhBENBLSUaANz7Qz',
			redirectUri: 'http://localhost:3000/callback',
			responseType: 'id_token',
			scope: 'openid profile',
		});

		this.getProfile = this.getProfile.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
	}

	// returns the profile of the authenticated user, if any.
	getProfile() {
		return this.profile;
	}
	// returns the idToken generated by Auth0 for the current user. used for post requests
	getIdToken() {
		return this.idToken;
	}
	// checks if there is an authenticated user or not
	isAuthenticated() {
		return new Date().getTime() < this.expiresAt;
	}
	// initializes the authentication process
	signIn() {
		this.auth0.authorize();
	}

	// after user is redirected from Auth0, this method fetches the user details/id token
	handleAuthentication() {
		return new Promise((resolve, reject) => {
			this.auth0.parseHash((err, authResult) => {
				if (err) return reject(err);
				if (!authResult || !authResult.idToken) {
					return reject(err);
				}
				this.idToken = authResult.idToken;
				this.profile = authResult.idTokenPayload;
				// set the time that the id token will expire at
				this.expiresAt = authResult.idTokenPayload.exp * 1000;
				resolve();
			});
		});
	}

	// clear id token, profile, and expiration
	signOut() {
		this.idToken = null;
		this.profile = null;
		this.expiresAt = null;
	}
}
// creates an instance of the Auth class
const auth0Client = new Auth();

export default auth0Client;