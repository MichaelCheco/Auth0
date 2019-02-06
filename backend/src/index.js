const express = require('express'); // express: This is Express itself.
const bodyParser = require('body-parser'); // body-parser: This is a library that you will use to convert the body of incoming requests into JSON objects.
const cors = require('cors'); // cors: This is a library that you will use to configure Express to add headers stating that your API accepts requests coming from other origins. This is also known as Cross-Origin Resource Sharing (CORS).
const helmet = require('helmet'); // helmet: This is a library that helps to secure Express apps with various HTTP headers.
const morgan = require('morgan'); // morgan: This is a library that adds some logging capabilities to your Express app.

