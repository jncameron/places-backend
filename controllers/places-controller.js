const uuid = require("uuid/v4");
const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous buildings in the world",
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    },
    address: "20 W 34th St, New York, NY 10001, United States",
    creator: "u1"
  },
  {
    id: "p3",
    title: "Empire State Building again",
    description: "One of the most famous buildings in the world",
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    },
    address: "20 W 34th St, New York, NY 10001, United States",
    creator: "u1"
  },
  {
    id: "p2",
    title: "Sydney Opera House",
    description: "Iconic location in Sydney",
    location: {
      lat: -33.8567799,
      lng: 151.2131027
    },
    address: "Bennelong Point, Sydney NSW 2000",
    creator: "u2"
  }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided user!", 404);
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.id;
  const places = DUMMY_PLACES.filter(p => {
    return p.creator === userId;
  });
  if (!places || places.length === 0) {
    throw new HttpError("Could not find places for the provided user id!", 404);
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
  console.log(` This place was created ${JSON.stringify(createdPlace)}`);
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
