const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
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

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });
  res.json({ place: place });
});

router.get("/user/:id", (req, res, next) => {
  const userId = req.params.id;
  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  });
  res.json({ place });
});

module.exports = router;
