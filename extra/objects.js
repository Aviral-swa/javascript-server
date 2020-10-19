// Initialization of Objects
let Object1 = {
    id: 0,
    name: "user 1",
    designation:["developer", "fresher"],
    age: 22,
    hello: function(){
        console.log("Hello", this.name)
    } 
}
console.log(Object1.designation);
Object1.hello();

let Object2 = {
    id: 1,
    name: "user 2",
    designation: ["developer", "fresher"],
    hello: function(){
        console.log("hello", this.name)
    }
}
console.log(Object2.designation);
Object2.hello();

// Using Object.assign method

console.log(Object1);
let modObject = Object.assign(Object1,Object2); //copies all properties of source into target and returns a modified object
console.log(modObject);                     
console.log(Object1);             //original Object also gets modified by assign() method

// Using Object.create method

let modObject1 = Object.create(Object1);
modObject1.age = 21;
console.log(modObject1.age);      //create() method returns an object with all the properties of the prototyped object

// Using Object.defineProperties method

Object.defineProperties(Object1,{ pincode : {value: 201301}})  
console.log(Object1.pincode)        // used to define new or modifies existing properties directly on an object

//Using Object.entries method

for (const [key,value] of Object.entries(Object1)){
    console.log(key, value)     // used to iterate over an object of key value pairs in the same order they are defined
}

//Using Object.freeze method

Object.freeze(modObject)       // prevents new modifications on the object
modObject.name = "temp"       // will throw an error in strict mode

//Using Object.is method

console.log(Object.is(Object1.name, Object1.age)) // used to compare two properties of an object

//Using Object.keys method

console.log(Object.keys(Object1))   // returns an array of all keys inside the object like a loop would

//Using Object.values method

console.log(Object.values(Object1)) // returns an array of all the values inside the object

//Using Object.seal method

Object.seal(modObject1)             // prevents adding new properties but still can add modify previously defined properties

