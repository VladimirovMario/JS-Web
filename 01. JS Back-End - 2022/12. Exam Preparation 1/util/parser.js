function parseError(error) {

  // console.log(error);

  if (error.name == "ValidationError") {
    // [ 'Username must be at least 3 characters long' ]
    return Object.values(error.errors).map((v) => v.message);
  } else {
    return error.message.split("\n");
  }
}

module.exports = {
  parseError,
};
