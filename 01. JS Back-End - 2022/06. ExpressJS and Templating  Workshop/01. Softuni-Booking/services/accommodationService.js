const fs = require("fs");

const filename = "./models/data.json";

const data = JSON.parse(fs.readFileSync(filename));
// console.log(data);

async function persist() {
  return new Promise((res, rej) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
      if (err == null) {
        res();
      } else {
        rej();
      }
    });
  });
}

function getAll(search, city, fromPrice, toPrice) {
  console.log("From accommodationService: ", search, city, fromPrice, toPrice);
  search = search.toLowerCase();
  city = city.toLowerCase();

  return data
    .filter((el) => el.name.toLowerCase().includes(search) || el.description.toLowerCase().includes(search))
    .filter((el) => el.city.toLowerCase().includes(city))
    .filter((el) => el.price >= fromPrice && el.price <= toPrice);
}

function getById(id) {
  return data.find((i) => i.id == id);
}

async function create(roomData) {
  const room = {
    id: getId(),
    name: roomData.name.trim(),
    description: roomData.description.trim(),
    city: roomData.city.trim(),
    beds: Number(roomData.beds),
    price: Number(roomData.price),
    imgUrl: roomData.imgUrl.trim(),
  };

  const missing = Object.entries(room).filter(([k, v]) => !v);
  if (missing.length > 0) {
    console.log(missing.map((m) => `${m[0]} is required!`));
    throw new Error(missing.map((m) => `${m[0]} is required!`).join("\n"));
  }

  data.push(room);
  await persist();

  // return room for controller to read the id
  return room;
}

function getId() {
  return "000000" + ((Math.random() * 99999) | 0).toString(16).slice(-6);
}

module.exports = {
  getAll,
  getById,
  create,
};
