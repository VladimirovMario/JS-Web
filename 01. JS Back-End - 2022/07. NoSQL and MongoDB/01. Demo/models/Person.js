const { Schema, model } = require("mongoose");

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  nationality: {
    type: String,
    // Exemplary validations
    enum: {
      values: ["Bulgarian", "Greek", 'Uk', 'German'],
      message: `{VALUE} nationality isn't supported!`,
    },
  },
});

// Property Validation
personSchema.path("age").validate(function () {
  return this.age >= 0;
}, "Age cannot be negative.");

// Model Methods
personSchema.methods.sayHi = function () {
  return `${this.firstName} ${this.lastName} says hi!`;
};

// Model Virtual Properties
personSchema
  .virtual("name")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (value) {
    // console.log("value from setter function:", value);
    // value from setter function: Jane Smith
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  });

const Person = model("Person", personSchema);

module.exports = Person;
