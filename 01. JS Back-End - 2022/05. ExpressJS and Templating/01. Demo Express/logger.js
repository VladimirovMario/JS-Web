module.exports = () => (req, res, next) => {
  console.log(`---`);
  console.log(">>>", req.method, req.url);
  next();
};
