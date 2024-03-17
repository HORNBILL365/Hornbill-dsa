// Define an array
let myArray = [];

// Function to insert an element at a specific index
function insertElement(element, index) {
  // Create a new array to store the modified elements
  let newArray = [];
  // Loop through the original array
  for (let i = 0; i < myArray.length; i++) {
    // If the current index matches the insertion index, add the new element
    if (i === index) {
      newArray.push(element);
    }
    // Add the current element from the original array to the new array
    newArray.push(myArray[i]);
  }
  // Update the original array with the new array
  myArray = newArray;
}

// Function to delete an element at a specific index
function deleteElement(index) {
  // Create a new array to store the modified elements
  let newArray = [];
  // Loop through the original array
  for (let i = 0; i < myArray.length; i++) {
    // If the current index does not match the deletion index, add the element to the new array
    if (i !== index) {
      newArray.push(myArray[i]);
    }
  }
  // Update the original array with the new array
  myArray = newArray;
}

// Function to traverse and print all elements of the array
function traverseArray() {
  // Loop through the array and print each element
  for (let i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
  }
}

// Insert elements into the array
insertElement(10, 0);
insertElement(20, 1);
insertElement(30, 2);

// Print the array before deletion
console.log("Array before deletion:");
traverseArray();

// Delete an element from the array
deleteElement(1);

// Print the array after deletion
console.log("Array after deletion:");
traverseArray();
