// Define a Queue class
class Queue {
    constructor() {
      this.items = []; // Initialize an empty array to store queue elements
      this.front = 0; // Initialize front index of the queue
      this.rear = -1; // Initialize rear index of the queue
    }
  
    // Function to get the front element of the queue without removing it
    getFront() {
      if (this.isEmpty()) {
        return "Queue is empty"; // Return a message if the queue is empty
      }
      return this.items[this.front]; // Return the front element of the queue
    }
  
    // Function to get the rear element of the queue without removing it
    getRear() {
      if (this.isEmpty()) {
        return "Queue is empty"; // Return a message if the queue is empty
      }
      return this.items[this.rear]; // Return the rear element of the queue
    }
  
    // Function to check if the queue is empty
    isEmpty() {
      return this.front > this.rear; // Return true if front index is greater than rear index, indicating an empty queue
    }
  
    // Function to enqueue an element into the queue
    enqueue(element) {
      this.items[++this.rear] = element; // Increment rear index and add the element to the queue
    }
  
    // Function to dequeue the front element from the queue
    dequeue() {
      if (this.isEmpty()) {
        return "Underflow"; // Return "Underflow" if the queue is empty
      }
      let deletedElement = this.items[this.front]; // Get the front element to be deleted
      delete this.items[this.front++]; // Remove and increment front index
      return deletedElement; // Return the deleted element
    }
  
    // Function to print the elements of the queue
    printQueue() {
      let queueString = "";
      for (let i = this.front; i <= this.rear; i++) {
        queueString += this.items[i] + " "; // Concatenate each element with a space
      }
      console.log("Queue elements:", queueString.trim()); // Print the queue elements
    }
  }
  
  // Example usage
  let queue = new Queue();
  
  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);
  
  console.log("Queue after enqueue operations:");
  queue.printQueue(); // Print the queue after enqueue operations
  
  console.log("Front:", queue.getFront()); // Get the front element
  console.log("Rear:", queue.getRear()); // Get the rear element
  
  console.log("Dequeue:", queue.dequeue()); // Dequeue the front element
  console.log("Queue after dequeue operation:");
  queue.printQueue(); // Print the queue after dequeue operation
  