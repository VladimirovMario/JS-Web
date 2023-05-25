const mongoose = require("mongoose");

const Article = require("./models/Article");
const Comment = require("./models/Comment");

const connectionString = "mongodb://localhost:27017/testdb2";

start();

async function start() {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected");

  1; // Creating collections in database
  //   await Article.create({
  //     author: "Jane",
  //     title: "My first article",
  //     content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  //   })

  //   await Comment.create({
  //     author: "Iva",
  //     content: "Nice article!",
  //   });

  2; //We create two models that reference each other
  // const article = await Article.findOne({});
  // const comment = await Comment.findOne({});
  // article.comments.push(comment);
  // await article.save();

  3; //To load all the data referenced with the entity use populate()
  const article = await Article.findOne({}).populate("comments");
  console.log(article);
  /*
  {
  _id: new ObjectId("634c1396f19b019baf574bdb"),
  author: 'Jane',
  title: 'My first article',
  content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  comments: [
    {
      _id: new ObjectId("634c14530268661bee125c1a"),
      author: 'Iva',
      content: 'Nice article!',
      __v: 0
    }
  ],
  __v: 1
}
  */

  await mongoose.disconnect();
}
