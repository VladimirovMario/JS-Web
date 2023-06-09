const catalogController = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { createPost, getAll, getById, deleteById, updateById, votedUsers} = require("../services/postService");
const { parseError } = require("../util/parser");
const { submitValidations } = require("../util/validator");

catalogController.get("/", async (req, res) => {
  const posts = await getAll();
  res.render("catalog", {
    title: "Catalog Page",
    posts,
  });
});

catalogController.get("/create", hasUser(), (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

catalogController.post("/create", hasUser(), async (req, res) => {
  const post = {
    title: req.body.title,
    keyword: req.body.keyword,
    location: req.body.location,
    createdAt: req.body.createdAt,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    owner: req.user._id,
  };
  try {
    submitValidations(req.body);
    await createPost(post);

    res.redirect("/catalog");
  } catch (error) {
    const errors = parseError(error);
    res.render("create", {
      title: "Create Failed",
      errors,
      body: post,
    });
  }
});

catalogController.get("/:id", async (req, res) => {
  const post = await getById(req.params.id);

  // TODO not working properly. I have to fixed it 
  if (req.user != undefined) {
    post.isOwner = post.owner.toString() == req.user._id.toString();
    post.voted =  post.users.map( x => x.toString().includes(req.user._id.toString()))
    console.log(post.voted);
  }

  res.render("details", {
    title: "Details Page",
    post,
  });
});

catalogController.get("/:id/delete", hasUser(), async (req, res) => {
  const post = await getById(req.params.id);
  if (post.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/");
  }
  await deleteById(req.params.id);
  res.redirect("/catalog");
});

catalogController.get("/:id/edit", hasUser(), async (req, res) => {
  const post = await getById(req.params.id);
  if (post.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/auth/login");
  }
  res.render("edit", {
    title: "Edit Page",
    body: post,
  });
});

catalogController.post("/:id/edit", hasUser(), async (req, res) => {
  const post = await getById(req.params.id);
  if (post.owner.toString() !== req.user._id.toString()) {
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
        keyword: req.body.keyword,
        location: req.body.location,
        createdAt: req.body.createdAt,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        _id: req.params.id,
      },
    });
  }
});

// TODO not working properly. I have to fixed it 
catalogController.get("/:id/like", hasUser(), async (req, res) => {
  const post = await getById(req.params.id);
  let like;

  if (post.owner.toString() != req.user._id.toString() &&
  post.users.map((x) => x.toString()).includes(req.user._id.toString()) == false) {
      like = 'like'
      votedUsers(req.params.id, req.user._id, like);    
  }
  res.redirect(`/catalog/${req.params.id}`);
})
// TODO not working properly. I have to fixed it 
catalogController.get("/:id/dislike", hasUser(), async (req, res) => {
  const post = await getById(req.params.id);
  let dislike;

  if (post.owner.toString() != req.user._id.toString() &&
    post.users.map((x) => x.toString()).includes(req.user._id.toString()) == false) {
      dislike = 'dislike'
      votedUsers(req.params.id, req.user._id, dislike);    
  }
  res.redirect(`/catalog/${req.params.id}`);
})

module.exports = catalogController;
