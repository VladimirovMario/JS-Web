1; // Variable Types

1.1;
// let username = 'Ivan';
// username = 1;
// console.log(username);
1.2;
// let isDone: boolean = false;
// isDone = 1;
1.3;
// let decimal: number = 6;
// let hex: number = 0xf00d;
// let binary: number = 0b1010;
// let octal: number = 0o744;
1.4;
let color: string = "blue";
color = 'red';
// color = 1
1.5;
// let list: number[] = [1, 2, '3'];
let numArray: Array<number> = [1, 2, 3];

//// Make it optional: age?
function createUser(username: String , age: Number) {
  return {
    username,
    age
  };
}
const peter = createUser('Ivan', 25);
console.log(peter);

2; // Generics and Enumerations

2.1;
// function identity<T>(arg: T): T {
//     return arg;
// }
// let output1 = identity<string>("myString");
// // type of output will be 'string'
// let output2 = identity(5);
// // type of output will be 'number'

2.2;
function identity<T>(arg: T): T {
  return arg;
}
const num = identity(1);
let num1 = identity(1);

3; // Interfaces

3.1;
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}
const myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

3.2;
function id<T>(arg: T): T {
  return arg;
}
interface IMyDto {
  prop: string;
  prop1: number;
}

type MyDtoOrNumber = IMyDto | number;

const num2 = <MyDtoOrNumber>{ prop: "1", prop1: 1 };
console.log(num);

4; // Classes

4.1;
class Greeter {
    public greeting : string;
    constructor(message : string) {
      this.greeting = message;
    }
    greet() : string {
        return `Hello, ${this.greeting}`;
    }
  }

  let greeter : Greeter = new Greeter("world!");
  console.log(greeter.greet());

4.2;
class MyClass {
  constructor(public name: string, private age: number) {}
}
const ivan = new MyClass("Ivan", 20);
console.log(ivan);
