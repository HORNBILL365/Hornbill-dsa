// Define a Stack class
class Stack {
    constructor() {
      this.items = []; // Initialize an empty array to store stack elements
    }
  
    // Function to push an element onto the stack
    push(element) {
      this.items.push(element); // Add the element to the end of the array (top of the stack)
    }
  
    // Function to pop the top element from the stack
    pop() {
      if (this.isEmpty()) {
        return "Underflow"; // Return "Underflow" if the stack is empty
      }
      return this.items.pop(); // Remove and return the top element from the array (top of the stack)
    }
  
    // Function to peek at the top element of the stack without removing it
    peek() {
      if (this.isEmpty()) {
        return "No elements in the stack"; // Return a message if the stack is empty
      }
      return this.items[this.items.length - 1]; // Return the top element of the array (top of the stack)
    }
  
    // Function to check if the stack is empty
    isEmpty() {
      return this.items.length === 0; // Return true if the stack is empty, false otherwise
    }
  
    // Function to print the elements of the stack
    printStack() {
      let stackString = "";
      for (let i = 0; i < this.items.length; i++) {
        stackString += this.items[i] + " "; // Concatenate each element with a space
      }
      console.log("Stack elements:", stackString.trim()); // Print the stack elements
    }
  }
  
  // Example usage
  let stack = new Stack();
  
  stack.push(10);
  stack.push(20);
  stack.push(30);
  
  console.log("Stack after push operations:");
  stack.printStack(); // Print the stack after push operations
  
  console.log("Peek:", stack.peek()); // Peek at the top element
  
  console.log("Pop:", stack.pop()); // Pop the top element
  console.log("Stack after pop operation:");
  stack.printStack(); // Print the stack after pop operation
  