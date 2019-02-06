const express = require('express'); // express: This is Express itself.
const bodyParser = require('body-parser'); // body-parser: This is a library that you will use to convert the body of incoming requests into JSON objects.
const cors = require('cors'); // cors: This is a library that you will use to configure Express to add headers stating that your API accepts requests coming from other origins. This is also known as Cross-Origin Resource Sharing (CORS).
const helmet = require('helmet'); // helmet: This is a library that helps to secure Express apps with various HTTP headers.
const morgan = require('morgan'); // morgan: This is a library that adds some logging capabilities to your Express app.
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(8081, () => console.log('listening on port 8081'));
