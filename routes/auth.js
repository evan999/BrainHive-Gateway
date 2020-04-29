const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authServer } = require('../config/default');

// @route  POST api/auth
// @desc	 authentication route for the gateway
// @access public
router.post('/', async (req, res) => {
  try {
    let response;
    const token = req.header('x-auth-token');
    switch (req.body.action) {
      case 'registerUser':
        response = await registerUser(req.body.reqBody);
        break;
      case 'loginUser':
        response = await loginUser(req.body.reqBody);
        break;
      case 'registerProfile':
        //const token = req.header('x-auth-token');
        response = await registerProfile(token);
        break;
      case 'getCurrentProfile':
        response = await getCurrentProfile(token, req.body.reqBody);
        break;
      default:
        return res.status(404).json({ errors: { action: 'Invalid request' } });
    }
    if (response.errors) throw response.errors;
    res.json(response.data);
  } catch (error) {
    console.error('error', error);
    res.status(500).json(error);
  }
});

const registerUser = async (body) => {
  console.log('gateway action registerUser');
  try {
    const response = await axios.post(`${authServer}/api/users/`, body);
    console.log('response from service');
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const loginUser = async (body) => {
  console.log('gateway action login');
  try {
    const response = await axios.post(`${authServer}/api/users/login`, body);
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const registerProfile = async (token, body) => {
  //const token = req.header('x-auth-token');
  //const token = req.get('x-auth-token');

  //console.log(token);
  //console.log('gateway action registerProfile');
  // Decide if token is confirmed here or on microservice
  try {
    const response = await axios.post(`${authServer}/api/profiles`, body, {
      headers: { 'x-auth-token': token },
    });
    //console.log(response);
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const getCurrentProfile = async (token) => {
  //const token = req.header('x-auth-token');
  try {
    const response = await axios.get(`${authServer}/api/profiles/self/`, {
      headers: { 'x-auth-token': token },
    });
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

module.exports = router;
