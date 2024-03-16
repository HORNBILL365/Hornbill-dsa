#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <limits.h>  // Required for INT_MAX and INT_MIN

// Structure to represent a node in the graph
struct Node {
    int value;
    int weight;
    struct Node* next;
};

// Structure to represent the graph
struct Graph {
    int numNodes;
    struct Node** adjList;
};

// Function to create a new node
struct Node* createNode(int value, int weight) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->value = value;
    newNode->weight = weight;
    newNode->next = NULL;
    return newNode;
}

// Function to create a graph with 'numNodes' nodes
struct Graph* createGraph(int numNodes) {
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));
    graph->numNodes = numNodes;
    graph->adjList = (struct Node**)malloc(numNodes * sizeof(struct Node*));

    for (int i = 0; i < numNodes; i++) {
        graph->adjList[i] = NULL;
    }

    return graph;
}

// Function to add an edge between nodes 'src' and 'dest' with weight 'weight'
void addEdge(struct Graph* graph, int src, int dest, int weight) {
    struct Node* newNode = createNode(dest, weight);
    newNode->next = graph->adjList[src];
    graph->adjList[src] = newNode;

    // For undirected graphs, you can add the reverse edge as well
    // newNode = createNode(src, weight);
    // newNode->next = graph->adjList[dest];
    // graph->adjList[dest] = newNode;
}

// Function to find the index of the node with the minimum distance
int minDistanceIndex(int distances[], bool visited[], int numNodes) {
    int minDistance = INT_MAX, minIndex;

    for (int i = 0; i < numNodes; i++) {
        if (!visited[i] && distances[i] < minDistance) {
            minDistance = distances[i];
            minIndex = i;
        }
    }

    return minIndex;
}

// Function to print the shortest distances from the start node using Dijkstra's algorithm
void dijkstra(struct Graph* graph, int start) {
    int numNodes = graph->numNodes;
    int distances[numNodes];  // Array to store distances
    bool visited[numNodes];   // Array to track visited nodes

    // Initialize distances as infinity and visited as false
    for (int i = 0; i < numNodes; i++) {
        distances[i] = INT_MAX;
        visited[i] = false;
    }

    // Distance from start node to itself is 0
    distances[start] = 0;

    // Loop through all nodes to find shortest distances
    for (int count = 0; count < numNodes - 1; count++) {
        // Find the node with the minimum distance among unvisited nodes
        int minIndex = minDistanceIndex(distances, visited, numNodes);

        // Mark the selected node as visited
        visited[minIndex] = true;

        // Update distances of adjacent nodes
        struct Node* current = graph->adjList[minIndex];
        while (current != NULL) {
            int neighbor = current->value;
            int weight = current->weight;
            if (!visited[neighbor] && distances[minIndex] != INT_MAX
                && distances[minIndex] + weight < distances[neighbor]) {
                distances[neighbor] = distances[minIndex] + weight;
            }
            current = current->next;
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
    int numNodes = 5;
    struct Graph* graph = createGraph(numNodes);

    // Add edges to the graph
    addEdge(graph, 0, 1, 5);
    addEdge(graph, 0, 2, 2);
    addEdge(graph, 1, 2, 1);
    addEdge(graph, 1, 3, 3);
    addEdge(graph, 2, 3, 7);
    addEdge(graph, 3, 4, 2);

    int startNode = 0; // Start node for Dijkstra's algorithm
    dijkstra(graph, startNode);

    return 0;
}
