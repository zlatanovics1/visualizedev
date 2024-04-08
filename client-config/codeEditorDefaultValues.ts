const defaultcppCode = {
  text: `
#include <iostream>
using namespace std;

int main(){
    cout << "Hello world";
    return 0;
}
    `,
};

const defaultjavascriptCode = {
  text: `
const message = "Hello playground";
console.log(message.replace("playground","world"));

    `,
};

const defaultpythonCode = {
  text: `
print("Hello world")
    `,
};

interface Code {
  text: string;
}

interface Section {
  [key: string]: Code;
}

interface DefaultCodes {
  cpp: Section;
  python: Section;
  javascript: Section;
}

export const defaultCodes: DefaultCodes = {
  cpp: {
    stack: {
      text: `
 #include <iostream>
 #include <stack>
 using namespace std;

 int main() {
    // create a stack of strings - stack<type>
    stack<string> languages;
    
    // add element to the Stack
    languages.push("javascript");
    languages.push("Cpp");
    languages.push("Go");
    
    // print top element
    cout << languages.top(); // returns last element

    return 0;
}
      `,
    },
    sorting: {
      text: `
 #include <iostream>
 using namespace std;

 int main(){
  int arr = {1,-1,-2,5,2,9,0}
  int n = 7; // length of the array
  int i,j;

  for(i = 0; i < n -1; i++){ // i < n-1 : We don't need to compare when "i" is = n, it's the same element
    for(j = i + 1; j < n; j++){
      if(arr[i] > arr[j]){ // ascending, descending: arr[i] < arr[j]
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }

  return 0;
 }
      `,
    },
    recursion: {
      text: `
 #include <iostream>
 using namespace std;

 // RECURSION USES STACK for execution procedures. See stack lecture for better understanding
 void printRecursively(int arr[], int n){
   if(n < 0) return;
   cout << arr[n] << " ";
   printRecursively(arr,n-1);
}

 void printAfterRecursion(int arr[],int n){
   if(n < 0) return;
   printAfterRecursion(arr,n-1);
   cout << arr[n] << " ";
}

 int main(){
   int arr[]= {1,2,3,4,5};
  int n = 5;

   printRecursively(arr,n-1); // OUTPUT: 5 4 3 2 1
   printAfterRecursion(arr,n-1); // OUTPUT: 1 2 3 4 5

   return 0;

  
}
      `,
    },
    graph: {
      text: `
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Graph {
    int numVertices;
    struct Node** adjLists;
};

// Function to create a new node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Function to create a graph with n vertices
struct Graph* createGraph(int vertices) {
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));
    graph->numVertices = vertices;

    // Create an array of adjacency lists
    graph->adjLists = (struct Node**)malloc(vertices * sizeof(struct Node*));

    // Initialize each adjacency list as empty by making head as NULL
    for (int i = 0; i < vertices; i++) {
        graph->adjLists[i] = NULL;
    }

    return graph;
}

// Function to add an edge to an undirected graph
void addEdge(struct Graph* graph, int src, int dest) {
    // Add an edge from src to dest
    struct Node* newNode = createNode(dest);
    newNode->next = graph->adjLists[src];
    graph->adjLists[src] = newNode;

    // Add an edge from dest to src (assuming undirected graph)
    newNode = createNode(src);
    newNode->next = graph->adjLists[dest];
    graph->adjLists[dest] = newNode;
}

// Function to print the adjacency list representation of the graph
void printGraph(struct Graph* graph) {
    for (int i = 0; i < graph->numVertices; i++) {
        struct Node* temp = graph->adjLists[i];
        printf("Adjacency list of vertex %d: ", i);
        while (temp) {
            printf("%d -> ", temp->data);
            temp = temp->next;
        }
        printf("NULL\n");
    }
}

int main() {
    int V = 5; // Number of vertices

    // Create a graph with 5 vertices
    struct Graph* graph = createGraph(V);

    // Add edges
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 4);
    addEdge(graph, 1, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 1, 4);
    addEdge(graph, 2, 3);
    addEdge(graph, 3, 4);

    // Print the adjacency list representation of the graph
    printGraph(graph);

    return 0;
}
`,
    },
  },
  python: {
    graph: {
      text: "",
    },
  },
  javascript: {
    graph: {
      text: "",
    },
  },
};
