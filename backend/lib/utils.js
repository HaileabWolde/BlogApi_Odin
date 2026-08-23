const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');



function issueJWT(user) {
  const _id = user.id;
  const _role = user.role;
  const _username = user.username;
  const expiresIn = '7d';

  const payload = {
    sub: _id,
    iat: Date.now(),
    role: _role,
    username:  _username
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.issueJWT = issueJWT;