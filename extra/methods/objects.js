// Initialization of Objects
let object1 = {
    id: 0,
    name: "user 1",
    designation:["developer", "fresher"],
    age: 22,
    hello: function(){
        console.log("Hello", this.name)
    } 
};
console.log(object1.designation);
object1.hello();

let object2 = {
    id: 1,
    name: "user 2",
    designation: ["developer", "fresher"],
    hello: function(){
        console.log("hello", this.name)
    }
};
console.log(object2.designation);
object2.hello();

// Using Object.assign method

console.log(object1);
let modifiedObject = Object.assign(object1,object2); //copies all properties of source into target and returns a modified object
console.log(modifiedObject);                     
console.log(object1);             //original Object also gets modified by assign() method

// Using Object.create method

let modifiedObject1 = Object.create(object1);
modifiedObject1.age = 21;
console.log(modifiedObject1.age);      //create() method returns an object with all the properties of the prototyped object

// Using Object.defineProperties method

Object.defineProperties(object1,{ pincode : {value: 201301}})  
console.log(object1.pincode)        // used to define new or modifies existing properties directly on an object

//Using Object.entries method

for (const [key,value] of Object.entries(object1)){
    console.log(key, value)     // used to iterate over an object of key value pairs in the same order they are defined
}

//Using Object.freeze method

Object.freeze(modifiedObject)       // prevents new modifications on the object
modifiedObject.name = "temp"       // will throw an error in strict mode

//Using Object.is method

console.log(Object.is(object1.name, object1.age)) // used to compare two properties of an object

//Using Object.keys method

console.log(Object.keys(object1))   // returns an array of all keys inside the object like a loop would

//Using Object.values method

console.log(Object.values(object1)) // returns an array of all the values inside the object

//Using Object.seal method

Object.seal(modifiedObject1)             // prevents adding new properties but still can add modify previously defined properties

