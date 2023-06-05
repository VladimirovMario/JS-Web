const profileController = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { getByUserBooking } = require("../services/hotelService");

profileController.get("/", hasUser(), async (req, res) => {
  const bookings = await getByUserBooking(req.user._id);
  // TODO const bookings = await getByUserBooking(req.user._id);
 
  res.render("profile", {
    title: "Profile Page",
    user: req.user,
  });
});

module.exports = profileController;
