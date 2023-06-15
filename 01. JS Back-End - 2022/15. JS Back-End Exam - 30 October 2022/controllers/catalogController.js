const catalogController = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { parseError } = require("../util/parser");
const { submitValidations } = require("../util/validator");
const {
  createPost,
  getAll,
  getById,
  getOwnerById,
  deleteById,
  updateById,
  followed,
} = require("../services/dataService");

catalogController.get("/", async (req, res) => {
  const data = await getAll();
  res.render("catalog", {
    title: "Catalog Page",
    body: data,
  });
});

catalogController.get("/create", hasUser(), (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

catalogController.post("/create", hasUser(), async (req, res) => {
  const data = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
    blog: req.body.blog,
    owner: req.user._id,
  };

  try {
    submitValidations(req.body);
    await createPost(data);

    res.redirect("/catalog");
  } catch (error) {
    const errors = parseError(error);
    res.render("create", {
      title: "Create Failed",
      errors,
      body: data,
    });
  }
});

catalogController.get("/:id", async (req, res) => {
  const data = await getById(req.params.id);
  const ownerEmailData = await getOwnerById(data.owner.toString())
  data.ownerEmail = ownerEmailData.email;

  if (req.user != undefined) {
    data.isOwner = data.owner.toString() == req.user._id.toString();
    data.isRented = data.followList
      .map((x) => x.toString())
      .includes(req.user._id.toString());
  }
  

  res.render("details", {
    title: "Details Page",
    body: data,
  });
});

catalogController.get("/:id/delete", hasUser(), async (req, res) => {
  const data = await getById(req.params.id);
  if (data.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/");
  }
  await deleteById(req.params.id);
  res.redirect("/catalog");
});

catalogController.get("/:id/edit", hasUser(), async (req, res) => {
  const data = await getById(req.params.id);
  if (data.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/auth/login");
  }
  res.render("edit", {
    title: "Edit Page",
    body: data,
  });
});

catalogController.post("/:id/edit", hasUser(), async (req, res) => {
  const data = await getById(req.params.id);
  if (data.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/auth/login");
  }

  try {
    submitValidations(req.body);

    await updateById(req.params.id, req.body);
    res.redirect(`/catalog/${req.params.id}`);
  } catch (error) {
    const errors = parseError(error);
    res.render("edit", {
      title: "Edit Failed",
      errors,
      body: {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        content: req.body.content,
        blog: req.body.blog,
        _id: req.params.id,
      },
    });
  }
});

catalogController.get("/:id/follow", hasUser(), async (req, res) => {
  const data = await getById(req.params.id);

  if (
    data.owner.toString() != req.user._id.toString() &&
    data.followList
      .map((x) => x.toString())
      .includes(req.user._id.toString()) == false
  ) {
    followed(req.params.id, req.user._id);
  }
  res.redirect(`/catalog/${req.params.id}`);
});

module.exports = catalogController;
