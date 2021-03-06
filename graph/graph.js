const _ = require('lodash');

/*
 *  
 */ 
class Vertex {
  constructor(name) {
    this.name = name;
    this.edges = [];
  }

  /*
   *  Add an edge connecting this vertex to the given vertex v to the adjacency list. 
   *  If this edge already exists, the adjacency list is left unchanged.
   */
  addEdge(v) {
    if (!this.neighborTo(v)) {
      this.edges.push(new Edge(v));
    };
  }

  /*
   *  Remove the edge connected to the given vertex from this vertex's adjacency list.
   *  If there isn't an edge connecting this vertex and v, the adjacency list is left
   *  unchanged.
   */
  removeEdge(v) {
    for (var i = 0; i < this.edges.length; i++) {
      if (this.edges[i].neighbor === v) {
        this.edges.splice(i, 1);
      }
    }
  }

  /*
   *  Return true iff this vertex has an edge connected to the given vertex v.
   */
  neighborTo(v) {
    for (var i = 0; i < this.edges.length; i++) {
      if (this.edges[i].neighbor === v) {
        return true;
      }
    }
    return false;
  }

  is(v) {
    return _.isEqual(this,v);
  }
};

/*
 *
 */
class Edge {
  constructor(neighbor) {
    this.weight = arguments[1] || 0;
    this.neighbor = neighbor;
  }
}

/*
 *
 */
class Graph {
  constructor(directed) {
    this.vertices = [];
    this.isDirected = directed || false;
  }

  /*
   *  Add a vertex to the graph.
   *
   *   @param {Vertex} v The vertex to be added to the graph.
   */
  addVertex(v) {
    // this should prevent outside manipulation of the graph, so
    // if I do `g.addVertex(v)` then v = 'broke u', the v in g will
    // still be a vertex.
    let temp_v = v;
    if (!(v instanceof Vertex)) {
      temp_v = new Vertex(v);
    }
    this.vertices.push(temp_v);
  }

  /*
   *  Remove the given vertex from the graph. If the given vertex is not
   *  a member of this graph, the graph is left unchanged.
   *
   *   @param {Vertex} v The vertex to be removed
   */
  removeVertex(v) {
    let temp_v = v;
    if (!(v instanceof Vertex)) {
      temp_v = new Vertex(v);
    }
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i].is(temp_v)) {
        this.vertices.splice(i, 1);

        // vertex removed
        return true;
      }
    }

    // vertex not found
    return false;
  }

  /*
   *  Return the vertex in this graph with the given name. If no vertex exists
   *  in this graph with the given name, return null.
   */
  getVertex(name) {
    for (var i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i].name === name) {
        return this.vertices[i];
      }
    }
    return null;
  }

  /*
   *  Add an edge between the given vertices with the given weight.
   *
   *   @param {Vertex} v1
   *   @param {Vertex} v2
   *   @param {number} weight
   */
  addEdge(v1, v2) {
    v1.addEdge(v2);

    // If undirected graph, add the other direction as well
    if (!this.isDirected) {
      v2.addEdge(v1);
    }
  }

  /*
   *  Return true iff there exists an edge (v1, v2) in this graph. Otherwise 
   *  return false.
   */
  hasEdge(v1, v2) {
    return v1.neighborTo(v2);
  }

  /*
   *  Remove the any edges between the given vertices from the graph. If one of the
   *  given vertices does not exist in this graph, the graph is left unchanged.
   *
   *   @param {Vertex} v1
   *  @param {Vertex} v2
   */
  removeEdge(v1, v2) {
    v1.removeEdge(v2);

    // If graph is undirected, remove the other direction
    if(!this.isDirected) {
      v2.removeEdge(v1);
    }
  } 

  /*
   *  Return true if there exists a path between the two given vertices in the graph,
   *  otherwise return false. Note that if either of these vertices do not belong to
   *  this graph, false will be returned.
   *
   *  @param {Vertex} v1
   *  @param {Vertex} v2
   */
  pathExists(v1, v2) {
  }

  /*
   *  Return true iff there exists a cycle in the graph, otherwise return false.
   */
  isCyclic() {

  }

  /*
   *   Return true iff this graph is connected.
   *
   *   @return {bool}
   */
  isConnected() {

  }

  /*
   *  Return true iff this graph is a tree, otherwise return false.
   */
  isTree() {
    return !this.isCyclic() && isConnected();
  }

  /*
   *
   */

}

exports.Vertex = Vertex;
exports.Edge = Edge;
exports.Graph = Graph;

// g = new Graph();
// g.addVertex("a");
// g.addVertex("b");
// a = g.vertices[0];
// b = g.vertices[1];
// g.addEdge(a, b);
// console.log(g.hasEdge(a, b));
// g.removeEdge(a, b);
// c = g.hasEdge(a, b);
// console.log(c);
