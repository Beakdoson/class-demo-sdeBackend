function generateUID() {
  // generates a unique 10 digits ID as a string

  let uid = "";
  for (let index = 0; index < 10; index++) {
    const rand = Math.floor(Math.random() * 10);
    uid += rand;
  }

  return uid;
}

exports.generateUID = generateUID;
