#include <stdio.h>  // Standard I/O library
#include <stdlib.h>  // Standard library for functions like malloc
#include <stdbool.h>  // Boolean data type support
#include <limits.h>  // Required for INT_MAX and INT_MIN constants

// Structure to represent a node in the graph
struct Node {
    int value;  // Node value
    int weight;  // Edge weight
    struct Node* next;  // Pointer to the next node in the adjacency list
};

// Structure to represent the graph
struct Graph {
    int numNodes;  // Number of nodes in the graph
    struct Node** adjList;  // Adjacency list for each node
};

// Function to create a new node
struct Node* createNode(int value, int weight) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));  // Allocate memory for the new node
    newNode->value = value;  // Set the node value
    newNode->weight = weight;  // Set the edge weight
    newNode->next = NULL;  // Initialize the next pointer to NULL
    return newNode;  // Return the new node
}

// Function to create a graph with 'numNodes' nodes
struct Graph* createGraph(int numNodes) {
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));  // Allocate memory for the graph
    graph->numNodes = numNodes;  // Set the number of nodes in the graph
    graph->adjList = (struct Node**)malloc(numNodes * sizeof(struct Node*));  // Allocate memory for the adjacency list

    for (int i = 0; i < numNodes; i++) {
        graph->adjList[i] = NULL;  // Initialize each adjacency list to NULL
    }

    return graph;  // Return the graph
}

// Function to add an edge between nodes 'src' and 'dest' with weight 'weight'
void addEdge(struct Graph* graph, int src, int dest, int weight) {
    struct Node* newNode = createNode(dest, weight);  // Create a new node for the destination with the specified weight
    newNode->next = graph->adjList[src];  // Set the next pointer of the new node to the current head of the adjacency list
    graph->adjList[src] = newNode;  // Update the head of the adjacency list to the new node

    // For undirected graphs, you can add the reverse edge as well
    // newNode = createNode(src, weight);
    // newNode->next = graph->adjList[dest];
    // graph->adjList[dest] = newNode;
}

// Function to find the index of the node with the minimum distance
int minDistanceIndex(int distances[], bool visited[], int numNodes) {
    int minDistance = INT_MAX;  // Initialize the minimum distance to infinity
    int minIndex;  // Variable to store the index of the minimum distance node

    for (int i = 0; i < numNodes; i++) {
        if (!visited[i] && distances[i] < minDistance) {  // Check if the node is unvisited and has a smaller distance
            minDistance = distances[i];  // Update the minimum distance
            minIndex = i;  // Update the index of the minimum distance node
        }
    }

    return minIndex;  // Return the index of the node with the minimum distance
}

// Function to print the shortest distances from the start node using Dijkstra's algorithm
void dijkstra(struct Graph* graph, int start) {
    int numNodes = graph->numNodes;  // Get the number of nodes in the graph
    int distances[numNodes];  // Array to store distances from the start node
    bool visited[numNodes];  // Array to track visited nodes

    // Initialize distances as infinity and visited as false for all nodes
    for (int i = 0; i < numNodes; i++) {
        distances[i] = INT_MAX;  // Set distance to infinity
        visited[i] = false;  // Mark node as unvisited
    }

    distances[start] = 0;  // Distance from start node to itself is 0

    // Loop through all nodes to find shortest distances
    for (int count = 0; count < numNodes - 1; count++) {
        int minIndex = minDistanceIndex(distances, visited, numNodes);  // Find the node with the minimum distance among unvisited nodes
        visited[minIndex] = true;  // Mark the selected node as visited

        // Update distances of adjacent nodes
        struct Node* current = graph->adjList[minIndex];  // Get the adjacency list of the selected node
        while (current != NULL) {
            int neighbor = current->value;  // Get the neighbor node
            int weight = current->weight;  // Get the edge weight to the neighbor
            if (!visited[neighbor] && distances[minIndex] != INT_MAX && distances[minIndex] + weight < distances[neighbor]) {
                distances[neighbor] = distances[minIndex] + weight;  // Update the distance if a shorter path is found
            }
            current = current->next;  // Move to the next adjacent node
        }
    }

    // Print the shortest distances from start node
    printf("Shortest distances from node %d:\n", start);
    for (int i = 0; i < numNodes; i++) {
        printf("To node %d: %d\n", i, distances[i]);
    }
}

// Example usage
int main() {
    int numNodes = 5;  // Number of nodes in the graph
    struct Graph* graph = createGraph(numNodes);  // Create the graph with the specified number of nodes

    // Add edges to the graph
    addEdge(graph, 0, 1, 5);
    addEdge(graph, 0, 2, 2);
    addEdge(graph, 1, 2, 1);
    addEdge(graph, 1, 3, 3);
    addEdge(graph, 2, 3, 7);
    addEdge(graph, 3, 4, 2);

    int startNode = 0;  // Start node for Dijkstra's algorithm
    dijkstra(graph, startNode);  // Perform Dijkstra's algorithm from the start node

    return 0;  // Return 0 to indicate successful execution
}
