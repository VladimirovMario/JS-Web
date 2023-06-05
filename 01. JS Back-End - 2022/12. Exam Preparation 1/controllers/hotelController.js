const {
  create,
  getById,
  update,
  deleteById,
  bookRoom,
} = require("../services/hotelService");
const { parseError } = require("../util/parser");

const hotelController = require("express").Router();

// TODO replace with real controller
hotelController.get("/:id/details", async (req, res) => {
  const hotel = await getById(req.params.id);

  if (hotel.owner == req.user._id) {
    // Before setting isOwner the data MUST be .lean(); !!!
    hotel.isOwner = true;
  } else if (hotel.bookings.map(b=> b.toString()).includes(req.user._id)) {
    // Before setting isBooked the data MUST be .lean(); !!!
    hotel.isBooked = true;
  }

  res.render("details", {
    title: "Details Page",
    body: hotel,
  });
});

hotelController.get("/create", (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

hotelController.post("/create", async (req, res) => {
  const hotel = {
    name: req.body.hotel,
    city: req.body.city,
    freeRooms: Number(req.body["free-rooms"]),
    imageUrl: req.body.imgUrl,
    owner: req.user._id,
  };

  try {
    if (Object.values(hotel).some((v) => !v)) {
      throw new Error("All fields are required!");
    }
    const result = await create(hotel);
    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);

    console.log(errors);

    res.render("create", {
      title: "Create Failed",
      errors,
      body: {
        hotel: hotel.name,
        city: hotel.city,
        ["free-rooms"]: hotel.freeRooms,
        imgUrl: hotel.imageUrl,
      },
    });
  }
});

hotelController.get("/:id/edit", async (req, res) => {
  const hotel = await getById(req.params.id);

  if (hotel.owner != req.user._id) {
    return res.redirect("/auth/login");
  }
  res.render("edit", {
    title: "Edit Page",
    body: hotel,
  });
});

hotelController.post("/:id/edit", async (req, res) => {
  const hotelId = req.params.id;

  const hotel = await getById(hotelId);

  if (hotel.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  const edited = {
    name: req.body.hotel,
    city: req.body.city,
    freeRooms: Number(req.body["free-rooms"]),
    imageUrl: req.body.imgUrl,
  };

  try {
    if (Object.values(edited).some((v) => !v)) {
      throw new Error("All fields are required!");
    }
    await update(hotelId, edited);
    res.redirect(`/hotel/${hotelId}/details`);
  } catch (error) {
    const errors = parseError(error);

    console.log(errors);

    res.render("edit", {
      title: "Edit Failed",
      errors,
      body: {
        name: edited.name,
        city: edited.city,
        freeRooms: edited.freeRooms,
        imageUrl: edited.imageUrl,
        // TODO Check if i need this: (hotel:Object.assign(edit, { _id: req.params.id}),)
        _id: hotelId,
      },
    });
  }
});

hotelController.get("/:id/delete", async (req, res) => {
  const hotel = await getById(req.params.id);

  if (hotel.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  await deleteById(req.params.id);
  res.redirect("/");
});

hotelController.get("/:id/book", async (req, res) => {
  const hotel = await getById(req.params.id);

  try {
    if (hotel.owner == req.user._id) {
    // Before setting isOwner the data MUST be .lean(); !!!
      hotel.isOwner = true;
      throw new Error('Cannot book your own hotel')
    }
    await bookRoom(req.params.id, req.user._id)
    res.redirect(`/hotel/${req.params.id}/details`);

  } catch (error) {
    const errors = parseError(error)
    console.log(errors);
    res.render("details", {
      title: "Details Page",
      body: hotel,
      errors
    });
  }
});

module.exports = hotelController;
