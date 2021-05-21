const { generateUID } = require("./services");

const db = [
  {
    id: "427534983",
    name: "Roseau",
    location: "Dominica",
    photo: "https://unsplash.com/photos/JXPeoPmAZgo",
  },
  {
    id: generateUID(),
    name: "Tokyo",
    location: "Japan",
    photo: "https://unsplash.com/photos/tKCd-IWc4gI",
  },

  {
    id: generateUID(),
    name: "Gold Coast",
    location: "Australia",
    photo: "https://unsplash.com/photos/tKCd-IWc4gI",
  },
  {
    id: generateUID(),
    name: "Lagos",
    location: "Nigeria",
    photo: "https://unsplash.com/photos/9ySEZ-ugtJA",
  },
];

exports.destinations = db;
