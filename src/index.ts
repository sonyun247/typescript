interface Human{
  name:string,
  age:number,
  gender:string
}

const sayHi = (Human):string => {
  return `Hi! ${Human.name}, you're ${Human.age}, and ${Human.gender}`;
};

const someone:Human = {
  name:"TS",
  age:18,
  gender:"Male"
}

console.log(sayHi(someone));

export {};
