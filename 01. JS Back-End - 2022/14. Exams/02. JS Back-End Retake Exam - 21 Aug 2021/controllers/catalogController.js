const catalogController = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const {
  createPost,
  getAll,
  getById,
  deleteById,
  updateById,
  rented,
} = require("../services/housingService");
const { parseError } = require("../util/parser");
const { submitValidations } = require("../util/validator");

catalogController.get("/", async (req, res) => {
  const housings = await getAll();
  res.render("catalog", {
    title: "Catalog Page",
    housings,
  });
});

catalogController.get("/create", hasUser(), (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

catalogController.post("/create", hasUser(), async (req, res) => {
  const housing = {
    name: req.body.name,
    type: req.body.type,
    year: Number(req.body.year),
    city: req.body.city,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    availablePieces: Number(req.body.availablePieces),
    owner: req.user._id,
  };
  try {
    submitValidations(req.body);
    await createPost(housing);

    res.redirect("/catalog");
  } catch (error) {
    const errors = parseError(error);
    res.render("create", {
      title: "Create Failed",
      errors,
      body: housing,
    });
  }
});

catalogController.get("/:id", async (req, res) => {
  const housing = await getById(req.params.id);

  if (req.user != undefined) {
    housing.isOwner = housing.owner.toString() == req.user._id.toString();
    housing.isRented =  housing.rented.map( x => x.toString()).includes(req.user._id.toString())
   
  }
  
  res.render("details", {
    title: "Details Page",
    body: housing,
  });
});

catalogController.get("/:id/delete", hasUser(), async (req, res) => {
  const housing = await getById(req.params.id);
  if (housing.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/");
  }
  await deleteById(req.params.id);
  res.redirect("/catalog");
});

catalogController.get("/:id/edit", hasUser(), async (req, res) => {
  const housing = await getById(req.params.id);
  if (housing.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/auth/login");
  }
  res.render("edit", {
    title: "Edit Page",
    body: housing,
  });
});

catalogController.post("/:id/edit", hasUser(), async (req, res) => {
  const housing = await getById(req.params.id);
  if (housing.owner.toString() !== req.user._id.toString()) {
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
        name: req.body.name,
        type: req.body.type,
        year: Number(req.body.year),
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        availablePieces: Number(req.body.availablePieces),
        _id: req.params.id,
      },
    });
  }
});

catalogController.get("/:id/rent", hasUser(), async (req, res) => {
  const housing = await getById(req.params.id);

  if (housing.owner.toString() != req.user._id.toString() 
  && housing.rented.map((x) => x.toString()).includes(req.user._id.toString()) == false) {
    rented(req.params.id, req.user._id);
  }
  res.redirect(`/catalog/${req.params.id}`);

})


module.exports = catalogController;
