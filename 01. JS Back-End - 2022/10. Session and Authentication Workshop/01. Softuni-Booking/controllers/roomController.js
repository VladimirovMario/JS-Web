const roomController = require("express").Router();
const { getById, update, deleteById } = require("../services/roomService");

roomController.get("/:id/edit", async (req, res) => {
  const roomId = req.params.id;
  const room = await getById(roomId);

  console.log('>>>From roomController.get("/:id/edit" room: >>>', room);

  if (!req.user || room.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  res.render("edit", {
    title: "Edit Accommodation",
    room,
  });
});

roomController.post("/:id/edit", async (req, res) => {
  const roomId = req.params.id;
  const room = await getById(roomId);
  console.log(
    '>>> From roomController.post("/:id/edit": req.body >>>',
    req.body
  );

  if (!req.user || room.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  try {
    const result = await update(roomId, req.body);
    res.redirect("/catalog/" + result._id);
  } catch (error) {
    room.body._id = roomId;
    res.render("edit", {
      title: "Edit Accommodation",
      error: error.message.split("\n"),
      // When adding this, the fields will not be empty.
      room: req.body,
    });
  }
});

roomController.get("/:id/delete", async (req, res) => {
  const roomId = req.params.id;
  const room = await getById(roomId);

  console.log('>>>From roomController.get("/:id/delete" room: >>>', room);

  if (!req.user || room.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  res.render("delete", {
    title: "Delete Accommodation",
    room,
  });
});

roomController.post("/:id/delete", async (req, res) => {
  const roomId = req.params.id;
  const room = await getById(roomId);
  console.log('>>>From roomController.post("/:id/delete" room: >>>', room);

  if (!req.user || room.owner != req.user._id) {
    return res.redirect("/auth/login");
  }

  try {
    const result = await deleteById(roomId);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", result);
    res.redirect("/catalog");
  } catch (error) {
    room.body._id = roomId;
    res.render("delete", {
      title: "Delete Accommodation",
      error: error.message.split("\n"),
      // When adding this, the fields will not be empty.
      room: req.body,
    });
  }
});

module.exports = roomController;
