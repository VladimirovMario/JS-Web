const Course = require("../models/Course");

async function getAllByDate(search) {
  const query = {};
  if (search) {
    query.title = new RegExp( search, 'i');
  }
  return Course.find(query).sort({ createdAt: 1 }).lean();
}

async function getRecent() {
  return Course.find({}).sort({ usersCount: -1 }).limit(3).lean();
}

async function createCourse(course) {
  const title = course.title;
  // Validation for uniq title if we have index.
  const existing = await Course.findOne({ title }).collation({locale: "en", strength: 2,});

  if (existing) {
    throw new Error("Course with that name already exist!");
  }

  return Course.create(course);
}

async function getById(id) {
  return Course.findById(id).lean();
}

async function deleteById(id) {
  return Course.findByIdAndRemove(id);
}

async function updateById(id, body) {
  const edited = await Course.findById(id);

  edited.title = body.title;
  edited.description = body.description;
  edited.imageUrl = body.imageUrl;
  edited.duration = body.duration;
  return edited.save();
}

async function enrollUser(courseId, userId) {
  const existing = await Course.findById(courseId);
  existing.users.push(userId);
  existing.usersCount++;
  return existing.save();
}

module.exports = {
  getAllByDate,
  createCourse,
  getRecent,
  getById,
  deleteById,
  updateById,
  enrollUser,
};
