const courseController = require("express").Router();
const {createCourse, getById, deleteById, updateById, enrollUser } = require("../services/courseService");
const { parseError } = require("../util/parser");
const { submitValidations } = require("../util/validator");

courseController.get("/create", (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

courseController.post("/create", async (req, res) => {
  const course = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    duration: req.body.duration,
    owner: req.user._id,
  };

  try {
    submitValidations(req.body);

    await createCourse(course);

    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    res.render("create", {
      title: "Create Failed",
      errors,
      body: course,
    });
  }
});

courseController.get("/:id", async (req, res) => {
  const course = await getById(req.params.id);
  course.isOwner = course.owner.toString() == req.user._id.toString();
  course.enrolled =  course.users.map( x => x.toString()).includes(req.user._id.toString())


  res.render("details", {
    title: course.title,
    course,
  });
});

courseController.get("/:id/delete", async (req, res) => {
  const course = await getById(req.params.id);
  if (course.owner.toString() !== req.user._id.toString()) {
    // Don't forget return. It's very important :))
    return res.redirect("/auth/login");
  }
  await deleteById(req.params.id);
  res.redirect("/");
});

courseController.get("/:id/edit", async (req, res) => {
  const course = await getById(req.params.id);
  if (course.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/auth/login");
  }

  res.render("edit", {
    title: "Edit Page",
    body: course,
  });
});

courseController.post("/:id/edit", async (req, res) => {
  const course = await getById(req.params.id);
  if (course.owner.toString() !== req.user._id.toString()) {
    return res.redirect("/auth/login");
  }

  try {
    submitValidations(req.body);

    await updateById(req.params.id, req.body);
    res.redirect(`/course/${req.params.id}`);
  } catch (error) {
    const errors = parseError(error);
    res.render("edit", {
      title: "Edit Failed",
      errors,
      body: {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        _id: req.params.id,
      },
    });
  }
});

courseController.get("/:id/enroll", async (req, res) => {
  const course = await getById(req.params.id);

  if (course.owner.toString() != req.user._id.toString() 
  && course.users.map((x) => x.toString()).includes(req.user._id.toString()) == false) {
    enrollUser(req.params.id, req.user._id);
  }
  res.redirect(`/course/${req.params.id}`);
});

module.exports = courseController;
