// Define a Node class for the tree nodes
class Node {
    constructor(data) {
      this.data = data; // Data stored in the node
      this.left = null; // Pointer to the left child node
      this.right = null; // Pointer to the right child node
    }
  }
  
  // Define a BinarySearchTree class
  class BinarySearchTree {
    constructor() {
      this.root = null; // Initialize the root of the tree
    }
  
    // Function to insert a new node into the BST
    insert(data) {
      const newNode = new Node(data); // Create a new node with the given data
  
      // If the tree is empty, set the new node as the root
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode); // Call helper function to insert the node recursively
      }
    }
  
    // Helper function to recursively insert a node into the BST
    insertNode(node, newNode) {
      // If the new node's data is less than the current node's data, move to the left subtree
      if (newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode; // If left child is null, insert the new node here
        } else {
          this.insertNode(node.left, newNode); // Otherwise, recursively insert into the left subtree
        }
      } else { // If the new node's data is greater than or equal to the current node's data, move to the right subtree
        if (node.right === null) {
          node.right = newNode; // If right child is null, insert the new node here
        } else {
          this.insertNode(node.right, newNode); // Otherwise, recursively insert into the right subtree
        }
      }
    }
  
    // Function to search for a node with a given data in the BST
    search(data) {
      return this.searchNode(this.root, data); // Call helper function to search recursively starting from the root
    }
  
    // Helper function to recursively search for a node with a given data in the BST
    searchNode(node, data) {
      // If the node is null (reached a leaf or an empty subtree), return false
      if (node === null) {
        return false;
      }
  
      // If the data matches the current node's data, return true (found the node)
      if (data === node.data) {
        return true;
      }
  
      // If the data is less than the current node's data, search in the left subtree
      if (data < node.data) {
        return this.searchNode(node.left, data);
      } else { // If the data is greater than the current node's data, search in the right subtree
        return this.searchNode(node.right, data);
      }
    }
  
    // Function to delete a node with a given data from the BST
    delete(data) {
      this.root = this.deleteNode(this.root, data); // Call helper function to delete recursively starting from the root
    }
  
    // Helper function to recursively delete a node with a given data from the BST
    deleteNode(node, key) {
      // If the node is null (reached a leaf or an empty subtree), return null
      if (node === null) {
        return null;
      }
  
      // If the data is less than the current node's data, move to the left subtree for deletion
      if (key < node.data) {
        node.left = this.deleteNode(node.left, key);
        return node;
      } else if (key > node.data) { // If the data is greater than the current node's data, move to the right subtree for deletion
        node.right = this.deleteNode(node.right, key);
        return node;
      } else { // Found the node to be deleted
        // Node with only one child or no child
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }
  
        // Node with two children: Get the inorder successor (smallest in the right subtree)
        node.data = this.minValue(node.right);
        node.right = this.deleteNode(node.right, node.data);
        return node;
      }
    }
  
    // Function to find the minimum value in a subtree
    minValue(node) {
      let minVal = node.data;
      while (node.left !== null) {
        minVal = node.left.data;
        node = node.left;
      }
      return minVal;
    }
  
    // Function to check if the tree is a Binary Search Tree (BST)
    isBST() {
      return this.checkBST(this.root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }
  
    // Helper function to recursively check if a tree is a BST
    checkBST(node, min, max) {
      // If the node is null (reached a leaf or an empty subtree), it's a valid BST
      if (node === null) {
        return true;
      }
  
      // Check if the node's data is within the valid range for a BST
      if (node.data < min || node.data > max) {
        return false;
      }
  
      // Recursively check the left and right subtrees with updated min and max values
      return (
        this.checkBST(node.left, min, node.data - 1) &&
        this.checkBST(node.right, node.data + 1, max)
      );
    }
  }
  
  // Example usage
  let bst = new BinarySearchTree();
  bst.insert(50);
  bst.insert(30);
  bst.insert(70);
  bst.insert(20);
  bst.insert(40);
  bst.insert(60);
  bst.insert(80);
  
  console.log("Is BST:", bst.isBST()); // Check if the tree is a BST
  console.log("Search 40:", bst.search(40)); // Search for a node
  console.log("Search 100:", bst.search(100)); // Search for a node that doesn't exist
  
  bst.delete(30); // Delete a node
  console.log("Search 30 after deletion:", bst.search(30)); // Search for the deleted node
  console.log("Is BST after deletion:", bst.isBST()); // Check if the tree is still a BST after deletion
  