
// Using filter method

const arr2 = [250,150,100,450,500]
const result = arr2.filter(arr2 => arr2 > 200)
console.log(result)


// Using from method

console.log(Array.from("Aviral"))
console.log(Array.from([1,2,3,4],x => x*2))


// Using pop method
const name1 = ["Aviral" , "rahul" , " mayank" , "divyansh"]
name1.pop()
console.log(name1)


// Using push method

const name = ["Aviral" , "rahul" , " mayank" , "divyansh"]
name.push("tushar")
console.log(name)


// Using reverse method

const arr = ["one","two","three"]
const rev = arr.reverse()
console.log(rev)

//Using find method

const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
console.log(found);

//Using join method

const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join());
console.log(elements.join(''));

//Using slice method

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));
console.log(animals.slice(2, 4));

//Using splice method

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
console.log(months);

// Using sort method

const array2 = [10,11,33,55,77];
array2.sort(function(a,b){return b-a});
console.log(array2);