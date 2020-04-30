const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/profiles', auth);

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`App listening on port ${port}`));

// Post /api/auth
// Post /api/posts
// Post /api/comrev

// Gateway >> auth microservice
// Frontend >> gateway >> authservice

/*
	{
		action: 'keyword ex: registerUser, login, addProfile, getSelf',
		reqBody: {
			body
		}

		auth token still sent via x-auth-token header key
	}

*/
