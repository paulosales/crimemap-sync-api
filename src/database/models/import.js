/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { Schema, model } = require('../db');

const importStatusEnum = {
  RUNNING: 'RUNNING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

const importLogSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Import log data is required.'],
  },
  message: {
    type: String,
    required: [true, 'Import log message is required.'],
  },
});

const importSchema = new Schema({
  startDate: {
    type: Date,
    required: [true, 'Import start date is required.'],
    default: Date.now,
    index: true,
  },
  finishDate: Date,
  status: {
    type: String,
    required: [true, 'Import status is required.'],
    default: importStatusEnum.RUNNING,
    enum: [
      importStatusEnum.RUNNING,
      importStatusEnum.SUCCESS,
      importStatusEnum.FAIL,
    ],
  },
  author: {
    username: {
      type: String,
      required: [true, 'Author username is required.'],
    },
    firstName: {
      type: String,
      required: [true, 'Author first name is required.'],
    },
    lastName: {
      type: String,
      required: [true, 'Author last name is required.'],
    },
  },
  file: {
    name: {
      type: String,
      required: [true, 'Import file name is required.'],
    },
    hash: {
      type: String,
      require: [true, 'Import file hash is required'],
      unique: true,
    },
  },
  logs: [importLogSchema],
});

const Import = model('Import', importSchema);
const ImportLog = model('ImportLog', importLogSchema);

module.exports = {
  Import,
  ImportLog,
};
