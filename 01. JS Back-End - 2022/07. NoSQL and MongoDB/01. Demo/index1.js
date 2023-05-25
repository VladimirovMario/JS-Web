// const mongoose = require("mongoose");
// const { findOne } = require("./models/Person");
// const Person = require("./models/Person");

// const connectionString = "mongodb://localhost:27017/testdb2";

// start();

// async function start() {
//   await mongoose.connect(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("Database connected");

  1;
  /*
  const person = new Person({
    firstName: 'Iva',
    lastName: 'Petkova',
    age: 24,
    nationality: 'Bulgarian'
  })
  await person.save()

  const data = await Person.find({})
  data[0].name = 'Jane Smith'
  await data[0].save()

  console.log(data[0].sayHi());
  // Jane Smith says hi!
  console.log(data[0].name);
  // Jane Smith
  */

  2;
  // const person = await Person.find({ firstName: 'Iva'})
  // console.log(person);
  // find return collection: []
  // [
  //   {
  //     _id: new ObjectId("634be35f182aca8e19e9ef40"),
  //     firstName: 'Iva',
  //     lastName: 'Petkova',
  //     age: 24,
  //     nationality: 'Bulgarian',
  //     __v: 0
  //   }
  // ]

  3;
  //   const person = await Person.findOne({ firstName: 'Iva'})
  // console.log(person);
  //  findOne() return only first match: {}
  // {
  //   _id: new ObjectId("634be35f182aca8e19e9ef40"),
  //   firstName: 'Iva',
  //   lastName: 'Petkova',
  //   age: 24,
  //   nationality: 'Bulgarian',
  //   __v: 0
  // }

  4;
  // const person = await Person.findById("634bd803bbc8d2671128547a");
  // console.log(person);
  // {
  //   _id: new ObjectId("634bd803bbc8d2671128547a"),
  //   firstName: 'Jane',
  //   lastName: 'Smith',
  //   age: 29,
  //   __v: 0
  // }

  5;
  // const person = await Person.findById("634bd803bbc8d2671128547a");
  // person.age = 30;
  // await person.save();
  // console.log(person);
  // {
  //   _id: new ObjectId("634bd803bbc8d2671128547a"),
  //   firstName: 'Jane',
  //   lastName: 'Smith',
  //   age: 30,
  //   __v: 0
  // }
  6;
  // await Person.findByIdAndUpdate("634bd803bbc8d2671128547a", { $set: { nationality: 'Uk' } });
  7;
  // If we just need to create new data without storing it in variable.
  // await Person.create({
  //   firstName: "Jane",
  //   lastName: "Wilson",
  //   age: 25,
  //   nationality: "Uk",
  // });

  // Mongoose Queries Example!!!

  8;
  // const result = await Person
  // .find({})
  // .where('age')
  // .gte(24)
  // .lte(31)
  // console.log(result);

  9;
  //  Sorting in descending order.
  // const result = await Person
  // .find({})
  // .sort({ age: -1 });
  // console.log(result);

  10; 
  // // With .select('') we can list properties that we want to return. Not the whole object.
  // const result = await Person.find({})
  // .where('age')
  // .lt(18)
  // .select('firstName age')
  // [
  //   {
  //     _id: new ObjectId("634c06c815fe9b7ff679c9da"),
  //     firstName: 'Hans',
  //     age: 17
  //   }
  // ]
  // console.log(result);



  11;
  // const result = await Person.find({})
  //   .where("firstName")
  //   .equals("Jane")
  //   .where("age")
  //   .gt(18)
  //   .lt(65)
  //   .sort({ age: 1 })
    // .skip(10)
    // .limit(10);

  // console.log(result);

  // await mongoose.disconnect();
// }
