/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const debug = require('debug')('crimemap-sync-api');
const crypto = require('crypto');
const { Schema, model } = require('../db');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'User first name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'User last name is required.'],
  },
  username: {
    type: String,
    required: [true, 'User name is required.'],
  },
  email: {
    type: String,
    required: [true, 'User e-mail is required'],
  },
  roles: {
    type: [String],
  },
  permissions: {
    type: [String],
  },
  passwordSalt: {
    type: String,
    required: [true, 'User password salt is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
});

userSchema.static('login', async function(username, password) {
  const LOGIN_FAIL_MSG = 'Username or password is invalid!';

  debug(`querying for user ${username}.`);
  const user = await this.findOne({ username }).exec();
  debug(`user ${user} found.`);

  if (!user) {
    return {
      success: false,
      message: LOGIN_FAIL_MSG,
    };
  }

  debug('checking password.');
  if (await argon2.verify(user.password, password + user.passwordSalt)) {
    //Creating jwt token
    const payload = {
      iss: 'crimemap-auth',
      sub: user.id,
      iat: Math.floor(Date.now() / 1000),
      name: `${user.firstName} ${user.lastName}`,
      roles: user.roles,
      permissions: user.permissions,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY);
    debug(`password valid token ${token} generated for user ${username}.`);

    //Every successfull login, we change the password salt and the password hash.
    const newSalt = crypto.randomBytes(16).toString('base64');
    const newPassword = await argon2.hash(password + newSalt);
    user.passwordSalt = newSalt;
    user.password = newPassword;
    await user.save();

    return {
      success: true,
      token,
    };
  } else {
    debug(`invalid password for user ${username}.`);
    return {
      success: false,
      message: LOGIN_FAIL_MSG,
    };
  }
});

const User = model('User', userSchema);

module.exports = { User };
