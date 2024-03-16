// Class to represent a node in the graph
class Node {
    constructor(value, weight) {
        this.value = value;  // Node value
        this.weight = weight;  // Edge weight
        this.next = null;  // Pointer to the next node in the adjacency list
    }
}

// Class to represent the graph
class Graph {
    constructor(numNodes) {
        this.numNodes = numNodes;  // Number of nodes in the graph
        this.adjList = new Array(numNodes).fill(null);  // Adjacency list for each node
    }

    // Function to add an edge between nodes 'src' and 'dest' with weight 'weight'
    addEdge(src, dest, weight) {
        let newNode = new Node(dest, weight);  // Create a new node for the destination with the specified weight
        newNode.next = this.adjList[src];  // Set the next pointer of the new node to the current head of the adjacency list
        this.adjList[src] = newNode;  // Update the head of the adjacency list to the new node

        // For undirected graphs, you can add the reverse edge as well
        // newNode = new Node(src, weight);
        // newNode.next = this.adjList[dest];
        // this.adjList[dest] = newNode;
    }

    // Function to find the index of the node with the minimum distance
    minDistanceIndex(distances, visited) {
        let minDistance = Infinity;  // Initialize the minimum distance to infinity
        let minIndex;  // Variable to store the index of the minimum distance node

        for (let i = 0; i < distances.length; i++) {
            if (!visited[i] && distances[i] < minDistance) {  // Check if the node is unvisited and has a smaller distance
                minDistance = distances[i];  // Update the minimum distance
                minIndex = i;  // Update the index of the minimum distance node
            }
        }

        return minIndex;  // Return the index of the node with the minimum distance
    }

    // Function to print the shortest distances from the start node using Dijkstra's algorithm
    dijkstra(start) {
        let distances = new Array(this.numNodes).fill(Infinity);  // Array to store distances from the start node
        let visited = new Array(this.numNodes).fill(false);  // Array to track visited nodes

        distances[start] = 0;  // Distance from start node to itself is 0

        // Loop through all nodes to find shortest distances
        for (let count = 0; count < this.numNodes - 1; count++) {
            let minIndex = this.minDistanceIndex(distances, visited);  // Find the node with the minimum distance among unvisited nodes
            visited[minIndex] = true;  // Mark the selected node as visited

            // Update distances of adjacent nodes
            let current = this.adjList[minIndex];  // Get the adjacency list of the selected node
            while (current != null) {
                let neighbor = current.value;  // Get the neighbor node
                let weight = current.weight;  // Get the edge weight to the neighbor
                if (!visited[neighbor] && distances[minIndex] != Infinity && distances[minIndex] + weight < distances[neighbor]) {
                    distances[neighbor] = distances[minIndex] + weight;  // Update the distance if a shorter path is found
                }
                current = current.next;  // Move to the next adjacent node
            }
        }

        // Print the shortest distances from start node
        console.log(`Shortest distances from node ${start}:`);
        for (let i = 0; i < this.numNodes; i++) {
            console.log(`To node ${i}: ${distances[i]}`);
        }
    }
}

// Example usage
let numNodes = 5;  // Number of nodes in the graph
let graph = new Graph(numNodes);  // Create the graph with the specified number of nodes

// Add edges to the graph
graph.addEdge(0, 1, 5);
graph.addEdge(0, 2, 2);
graph.addEdge(1, 2, 1);
graph.addEdge(1, 3, 3);
graph.addEdge(2, 3, 7);
graph.addEdge(3, 4, 2);

let startNode = 0;  // Start node for Dijkstra's algorithm
graph.dijkstra(startNode);  // Perform Dijkstra's algorithm from the start node
