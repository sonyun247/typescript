class Human{
  public name:string;
  public age:number;
  private gender:string;
  constructor(name:string,age:number,gender:string){
    this.name=name;
    this.age=age;
    this.gender=gender;
  }
}

const sayHi = (person: Human):string => {
  return `Hi! ${person.name}, you're ${person.age}, and ${person.gender}`;
};

const someone = new Human("TS",18,"Male"); 

console.log(sayHi(someone));

export {};
