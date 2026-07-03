//ts-worksheet-with-variables
import Node from "./Node.js";

export default class Graph {
    constructor(startPosition) {
        this.adjacencyList = new Map();
        this.addNode(startPosition);
    }

    addNode(position) {
        if (!this.adjacencyList.has(position)) {
            this.adjacencyList.set(position, new Set());
        }
    }

    addEdge(position1, position2) {
        if (position1 === undefined || position2 === undefined) {
            throw new Error("Missing argument");
        }

        if (!this.adjacencyList.has(position1)) {
            this.addNode(position1);
        }
        if (!this.adjacencyList.has(position2)) {
            this.addNode(position2);
        }
        this.adjacencyList.get(position1).add(position2);
        this.adjacencyList.get(position2).add(position1);
    }

    bfs(startPosition, endPosition) {
        if (startPosition === undefined || endPosition === undefined) {
            throw new Error("Missing argument");
        }

        const parents = new Map();
        const visited = new Set();

        const queue = [];
        queue.push(startPosition);
        visited.add(startPosition);

        while (queue.length) {
            const currentPosition = queue.shift();
            if (currentPosition === endPosition)
                return this.routeParser(
                    startPosition,
                    endPosition,
                    parents,
                );

            this.getLegalKnightPositions(currentPosition).forEach(
                (position) => {
                    if (!visited.has(position)) {
                        this.addEdge(currentPosition, position);
                        parents.set(position, currentPosition);
                        visited.add(position);
                        queue.push(position);
                    }
                },
            );
        }
    }

    routeParser(startPosition, endPosition, Map) {
        const route = new Set();
        route.add(endPosition);
        let parent = Map.get(endPosition);

        while (parent !== startPosition && parent !== undefined) {
            route.add(parent);
            parent = Map.get(parent);
        }

        route.add(startPosition);
        return Array.from(route).reverse();
    }

    getLegalKnightPositions(position) {
        const columns = ["", "a", "b", "c", "d", "e", "f", "g", "h"];

        const column = columns.indexOf(position[0]);
        const row = +position[1];

        const knightOffsets = [
            [-1, 2],
            [1, 2],
            [2, 1],
            [2, -1],
            [1, -2],
            [-1, -2],
            [-2, -1],
            [-2, 1],
        ];

        const legalMoves = knightOffsets
            .map(([columnOffset, rowOffset]) => [
                column + columnOffset,
                row + rowOffset,
            ])
            .filter(
                ([legalColumn, legalRow]) =>
                    legalColumn >= 1 &&
                    legalColumn <= 8 &&
                    legalRow >= 1 &&
                    legalRow <= 8,
            )
            .map(
                ([legalColumn, legalRow]) =>
                    `${columns[legalColumn]}${legalRow}`,
            );

        return legalMoves;
    }
}
