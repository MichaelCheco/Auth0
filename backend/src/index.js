const express = require('express'); // This is Express itself.
const cors = require('cors'); // This is a library that you will use to configure Express to add headers stating that your API accepts requests coming from other origins. This is also known as Cross-Origin Resource Sharing (CORS).
const helmet = require('helmet'); // This is a library that helps to secure Express apps with various HTTP headers.
const morgan = require('morgan'); // This is a library that adds some logging capabilities to your Express app.
const knex = require('knex'); // a SQL query builder
const jwt = require('express-jwt'); // A middleware that validates a JSON Web Token (JWT) and set the req.user with its attributes.
const jwksRsa = require('jwks-rsa'); // A library to retrieve RSA public keys from a JWKS (JSON Web Key Set) endpoint.
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// parse application/json content-type
app.use(express.json());
// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// Retrieve all notes from the database
app.get('/api/notes', (req, res) => {
	db('notes')
		.then(notes => {
			res.status(200).json(notes);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// Retrieve a single note from the database
app.get('/api/notes/:id', (req, res) => {
	const { id } = req.params;
	db('notes')
		.where({ id })
		.then(note => {
			res.status(200).json(note);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

/* Remember to use your own Domain, Client ID, and Client Secret
 which are in the Applications/Settings tab of your Auth0 account
*/

// Express middleware that will validate ID tokens.
const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://michael-checo.auth0.com/.well-known/jwks.json`,
	}),

	// Validate the audience and the issuer.
	audience: 'ptuSIw3z5H8hnAx8MhBENBLSUaANz7Qz',
	issuer: `https://michael-checo.auth0.com/`,
	algorithms: ['RS256'],
});

// Post a new note to the database
app.post('/api/notes', checkJwt, (req, res) => {
	const note = req.body;
	db('notes')
		.insert(note)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	res.send({ author: req.user.name });
});

// Update a specific note
app.put('/api/notes/:id', checkJwt, (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	db('notes')
		.where({ id })
		.update(changes)
		.then(count => {
			res.status(200).json(count);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	res.send({ author: req.user.name });
});

// Delete a specific note
app.delete('/api/notes/:id', checkJwt, (req, res) => {
	const { id } = req.params;
	db('notes')
		.where({ id })
		.del()
		.then(count => {
			res.status(200).json(count);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	res.send({ author: req.user.name });
});
// start server
app.listen(8081, () => console.log('listening on port 8081'));
