const name = "TS", age = 18, gender = "Male";

const sayHi = (name, age, gender?) => {
  console.log(`Hi! ${name}, you're ${age}, and ${gender}`);
};

sayHi(name, age);

export {};
