/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
  passwordSalt: {
    type: String,
    required: [true, 'User password salt is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
});

const User = model('User', userSchema);

module.exports = { User };
