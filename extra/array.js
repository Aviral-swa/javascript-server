// Using map() method

const arr3 = [1,2,3,4,5];
let x = arr3.map(y => y * 10)   //returns an array after implying the function
console.log("map()", x)          //Complexity = O(n)

//Using reduce() method

const numbers = [175, 50, 25];
let myFunc = (total, num) => {  //reduces objects to a single value
    return total - num;
  }                                //complexity = O(n)
console.log("reduce()",numbers.reduce(myFunc))

//Using indexOf() method

const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log("isindex()", beasts.indexOf('bison'));   // returns index of 1st occurance of the element
                                      // complexity = O(n)

// Using findIndex() method

const ages = [3, 10, 18, 20];
let checkAdult = (age) => {         //returns the index of the first element in an array that pass a test
  return age >= 18;
};                                     //complexity = O(n)
console.log("findIndex()", ages.findIndex(checkAdult));

//Using forEach() method

let sum = 0;
const numbers1 = [65, 44, 12, 4];
let myFunction = (item) => {            //method calls a function once for each element
  sum += item;                      //complexity = O(n)
};
numbers1.forEach(myFunction);
console.log("forEach", sum)

//Using concat() method

const array11 = ['a', 'b', 'c']; // used to merge two or more arrays
const array22 = ['d', 'e', 'f']; //complexity = O(n)
const array33 = array11.concat(array22);
console.log("concat", array33);

// Using filter() method

const arr2 = [250,150,100,450,500]
const result = arr2.filter(arr2 => arr2 > 200)  // creates a new array with all elements that pass thecondition
console.log("filter()", result)             //Complexity = O(n)


// Using from() method

console.log("from()", Array.from("Aviral")) // returns an Array object from any iterable object.
console.log("from()", Array.from([1,2,3,4],x => x*2)) //Complexity = O(n)


// Using pop() method

const name1 = ["Aviral" , "rahul" , " mayank" , "divyansh"]
name1.pop()                             //removes the last element of an array, and returns that element.
console.log("pop()", name1)             //Complexity = O(1)


// Using push() method

const name = ["Aviral" , "rahul" , " mayank" , "divyansh"]
name.push("tushar")                 //adds new items to the end of an array, and returns the new length.
console.log("push()", name)                   //Complexity = O(1)

// Using shift() method

const name5 = ["Aviral" , "rahul" , " mayank" , "divyansh"]
name5.shift()                             //removes the first element of an array, and returns that element.
console.log("shift", name5)             //Complexity = O(n)


// Using unshift() method

const name6 = ["Aviral" , "rahul" , " mayank" , "divyansh"]
name6.unshift("tushar")                 //adds new element to the start of an array, and returns the new length.
console.log("unshift()", name6)                   //Complexity = O(n)


// Using reverse() method

const arr = ["one","two","three"]   //method reverses the order of the elements in an array.
const rev = arr.reverse()              //Complexity = O(n)
console.log("reverse()", rev)

//Using find() method

const array1 = [5, 12, 8, 130, 44]; //method returns the value of the first element that passes a condition
const found = array1.find(element => element > 10);
console.log("find()", found);                     //Complexity = O(n)

//Using join() method

const elements = ['Fire', 'Air', 'Water'];
console.log("join()", elements.join());   //method returns the array as a string seperated by a seperater
console.log("join()", elements.join('')); //Complexity = O(n)

//Using slice() method

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log("slice()", animals.slice(2)); //returns the selected elements in an array, as a new array object.
console.log("slice()", animals.slice(2, 4)); //Complexity = O(n)

//Using splice() method

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');  //adds/removes items to/from an array, and returns the removed item(s).
console.log("splice()", months);        //Complexity = O(n)

// Using sort() method

const array2 = [10,11,33,55,77]; 
array2.sort(function(a,b){return b-a});     //sorts the items of an array.
console.log("sort", array2);        //complexity = O(nlog(n))