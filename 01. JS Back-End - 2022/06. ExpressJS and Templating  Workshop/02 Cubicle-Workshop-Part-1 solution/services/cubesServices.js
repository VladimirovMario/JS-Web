const fs = require("fs");

const filename = "./models/data.json";

const data = JSON.parse(fs.readFileSync(filename));

function getAll(search, fromDifficulty, toDifficulty) {
  search = search.toLowerCase().trim();
  // console.log("From cubesServices: ", search, fromDifficulty, toDifficulty);

  if (fromDifficulty || toDifficulty) {
    return data
    .filter((el) => el.name.toLowerCase().includes(search) || el.description.toLowerCase().includes(search))
    .filter((el) => el.difficulty >= fromDifficulty && el.difficulty <= toDifficulty);
  } else {   
    return data
    .filter((el) => el.name.toLowerCase().includes(search) || el.description.toLowerCase().includes(search));
  }  
}

function getById(id) {
  return data.find((c) => c.id == id);
}

async function persist() {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
      if (err == null) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

async function create(cubeData) {
  const cube = {
    id: Number(idGenerator()),
    name: cubeData.name.trim(),
    imgUrl: cubeData.imageUrl.trim(),
    description: cubeData.description.trim(),
    difficulty: Number(cubeData.difficultyLevel),
  };

  const missing = Object.entries(cube).filter(([_, v]) => !v);
  console.log(missing);
  if (missing.length > 0) {
    console.log(missing.map((m) => `${m[0]} is required!`));
    throw new Error(missing.map((m) => `${m[0]} is required!`).join("\n"));
  }

  data.push(cube);
  await persist();
  return cube;
}

function idGenerator() {
  return ("00000" + ((Math.random() * 99999) | 0)).slice(-5);
  // return "000000" + ((Math.random() * 99999) | 0).toString(16).slice(-6);
}

module.exports = {
  getAll,
  getById,
  create,
};
