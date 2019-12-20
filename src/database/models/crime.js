/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { model, Schema } = require('../db');

const crimeTypes = {
  HOMICIDE: 1,
  BODILY_INJURY_FOLLOWED_BY_DEATH: 2,
  DEATH_ROBBERY: 3,
  FEMINICIDE: 4,
};

const weaponType = {
  GUN: 1,
  COLD_WEAPON: 2,
  OTHERS: 3,
};

const genderType = {
  MALE: 1,
  FEMALE: 2,
};

const citySchema = new Schema({
  name: {
    type: String,
    required: [true, 'City name is required'],
  },
});

const cvliSchema = new Schema({
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
  },
  type: {
    type: Number,
    enum: [
      crimeTypes.HOMICIDE,
      crimeTypes.BODILY_INJURY_FOLLOWED_BY_DEATH,
      crimeTypes.DEATH_ROBBERY,
      crimeTypes.FEMINICIDE,
    ],
  },
  weaponType: {
    type: Number,
    enum: [weaponType.GUN, weaponType.COLD_WEAPON, weaponType.OTHERS],
  },
  date: {
    type: Date,
  },
  victim: {
    name: String,
    gender: {
      type: Number,
      enum: [genderType.MALE, genderType.FEMALE],
    },
    age: Number,
  },
  cadavericDocument: {
    type: String,
  },
});

const crimeSchema = new Schema({
  type: {
    type: String,
  },
  address: {
    street: String,
    number: String,
    community: String,
    city: String,
  },
  geoPosition: {
    lat: Number,
    long: Number,
  },
  victim: {
    name: String,
    gender: {
      type: Number,
      enum: [genderType.FEMALE, genderType.MALE],
      age: Number,
    },
  },
  suspect: {
    name: String,
    gender: {
      type: Number,
      enum: [genderType.FEMALE, genderType.MALE],
      age: Number,
    },
  },
  vehicle: {
    description: String,
    year: String,
    color: String,
    licensePlate: {
      number: String,
      state: String,
    },
  },
  drung: String,
  weapon: String,
  obs: String,
});

const City = model('City', citySchema);
const Crime = model('Crime', crimeSchema);
const Cvli = model('Cvli', cvliSchema);

module.exports = {
  City,
  Crime,
  Cvli,
};
