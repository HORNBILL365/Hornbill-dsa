// Define a Node class for the tree nodes
class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  // Define a BinarySearchTree class
  class BinarySearchTree {
    constructor() {
      this.root = null;
    }
  
    // Function to insert a new node into the tree
    insert(data) {
      const newNode = new Node(data);
  
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }
  
    // Helper function to recursively insert a node
    insertNode(node, newNode) {
      if (newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }
  
    // Function to delete a node from the tree
    delete(data) {
      this.root = this.deleteNode(this.root, data);
    }
  
    // Helper function to recursively delete a node
    deleteNode(node, key) {
      if (node === null) {
        return null;
      } else if (key < node.data) {
        node.left = this.deleteNode(node.left, key);
        return node;
      } else if (key > node.data) {
        node.right = this.deleteNode(node.right, key);
        return node;
      } else {
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
  
    // Inorder traversal
    inorder(node) {
      if (node !== null) {
        this.inorder(node.left);
        console.log(node.data);
        this.inorder(node.right);
      }
    }
  
    // Preorder traversal
    preorder(node) {
      if (node !== null) {
        console.log(node.data);
        this.preorder(node.left);
        this.preorder(node.right);
      }
    }
  
    // Postorder traversal
    postorder(node) {
      if (node !== null) {
        this.postorder(node.left);
        this.postorder(node.right);
        console.log(node.data);
      }
    }
  
    // Level order traversal
    levelOrder() {
      let result = [];
      let queue = [];
      if (this.root !== null) {
        queue.push(this.root);
        while (queue.length > 0) {
          let node = queue.shift();
          result.push(node.data);
          if (node.left !== null) {
            queue.push(node.left);
          }
          if (node.right !== null) {
            queue.push(node.right);
          }
        }
      }
      return result;
    }
  }
  
  // Example usage
  let tree = new BinarySearchTree();
  tree.insert(50);
  tree.insert(30);
  tree.insert(70);
  tree.insert(20);
  tree.insert(40);
  tree.insert(60);
  tree.insert(80);
  
  // Inorder traversal
  console.log("Inorder traversal:");
  tree.inorder(tree.root);
  
  // Preorder traversal
  console.log("Preorder traversal:");
  tree.preorder(tree.root);
  
  // Postorder traversal
  console.log("Postorder traversal:");
  tree.postorder(tree.root);
  
  // Level order traversal
  console.log("Level order traversal:");
  console.log(tree.levelOrder());
  
  // Delete a node
  tree.delete(30);
  
  // Inorder traversal after deletion
  console.log("Inorder traversal after deletion:");
  tree.inorder(tree.root);
  