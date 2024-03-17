// Define a Node class for the linked list nodes
class Node {
    constructor(data) {
      this.data = data; // Data stored in the node
      this.next = null; // Pointer to the next node in the linked list
    }
  }
  
  // Define a Queue class using a linked list
  class Queue {
    constructor() {
      this.front = null; // Initialize front pointer of the queue (points to the first node)
      this.rear = null; // Initialize rear pointer of the queue (points to the last node)
    }
  
    // Function to get the front element of the queue without removing it
    getFront() {
      if (this.isEmpty()) {
        return "Queue is empty"; // Return a message if the queue is empty
      }
      return this.front.data; // Return the data of the front node
    }
  
    // Function to get the rear element of the queue without removing it
    getRear() {
      if (this.isEmpty()) {
        return "Queue is empty"; // Return a message if the queue is empty
      }
      return this.rear.data; // Return the data of the rear node
    }
  
    // Function to check if the queue is empty
    isEmpty() {
      return this.front === null; // Return true if front pointer is null, indicating an empty queue
    }
  
    // Function to enqueue an element into the queue
    enqueue(element) {
      const newNode = new Node(element); // Create a new node with the given element
      if (this.isEmpty()) {
        this.front = newNode; // If queue is empty, set the new node as both front and rear
        this.rear = newNode;
      } else {
        this.rear.next = newNode; // Add the new node after the current rear node
        this.rear = newNode; // Update rear pointer to the new node
      }
    }
  
    // Function to dequeue the front element from the queue
    dequeue() {
      if (this.isEmpty()) {
        return "Underflow"; // Return "Underflow" if the queue is empty
      }
      const deletedElement = this.front.data; // Get the data of the front node to be deleted
      this.front = this.front.next; // Move front pointer to the next node
      if (this.front === null) {
        this.rear = null; // If front becomes null (queue becomes empty), update rear pointer to null
      }
      return deletedElement; // Return the deleted element
    }
  
    // Function to print the elements of the queue
    printQueue() {
      let current = this.front; // Start from the front of the queue
      let queueString = "";
      while (current !== null) {
        queueString += current.data + " "; // Concatenate each node's data with a space
        current = current.next; // Move to the next node
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
  