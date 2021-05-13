import { immerable } from "immer";
import Point from "../game/point.js";

export default function Grid() {
    return new Grid.class();
}

Grid.class = class {
    [immerable] = true;

    constructor () {
        this.grid = {};
        this.first = null;
    }

    getFirst() {
        return this.first;
    }

    setAt(point, item) {
        if (! this.first) this.first = point;
        this.grid[point.x] = this.grid[point.x] || {};
        this.grid[point.x][point.y] = item;
    }

    getAt(point) {
        return this.grid[point.x] && this.grid[point.x][point.y];
    }

    removeAt(point) {
        // Do nothing if there's nothing to remove
        if (! this.getAt(point)) return;

        // If we're removing the first
        if (this.first.equals(point)) {
            const testQueue = [];
            testQueue.push(this.first.mapX(n => n - 1)); // Left
            testQueue.push(this.first.mapX(n => n + 1)); // Right
            testQueue.push(this.first.mapY(n => n - 1)); // Up
            testQueue.push(this.first.mapY(n => n + 1)); // Down
            let found;

            while (testQueue.length > 0) {
                const test = testQueue.pop();
                if (! this.getAt(test)) continue;
                found = test;
                break;
            }

            if (found) {
                this.first = found;
            } else {
                throw new Error("Removed item from grid broke adjacency rule")
            }
        }

        delete this.grid[point.x][point.y];
        if (Object.keys(this.grid[point.x]).length == 0) delete this.grid[point.x];
    }

    traverse(fn) {
        const visitedGrid = Grid();
        const first = this.getFirst();

        // If there are no cards, return empty
        if (! first) return;

        const testQueue = [ first ];

        while (testQueue.length > 0) {
            let current = testQueue.pop();
            let currentItem = this.getAt(current);

            // If there's no card here, drop it
            if (! currentItem) continue;

            // If we've visited it already, drop it
            if (visitedGrid.getAt(current)) continue;

            // Now we are visiting it
            visitedGrid.setAt(current, true);

            // Perform the requested function
            fn(currentItem, current);

            // Add all the adjacent cards to the queue.
            testQueue.push(current.mapX(n => n - 1)); // Left
            testQueue.push(current.mapX(n => n + 1)); // Right
            testQueue.push(current.mapY(n => n - 1)); // Up
            testQueue.push(current.mapY(n => n + 1)); // Down
        }
    }

    visit(fn) {
        Object.entries(this.grid).forEach(([x, column]) => {
            Object.entries(column).forEach(([y, item]) => {
                fn(item, Point(Number(x), Number(y)));
            })
        })
    }

    project(scalar) {
        const result = [];
        this.visit((item, point) => {
            const scaled = point.scale(scalar)
            result.push({ point, scaled })
        });
        return result;
    }

    reverseProjection(point, scalar) {
        return point.scale(1 / scalar).map(Math.floor);
    }

    exportJavaScript() {
        const js = [ "const grid = Grid();" ];
        this.visit((item, point) => {
            js.push(`grid.setAt(Point(${point.x}, ${point.y}), "${item}");`);
        });
        return js.join("\n");
    }
}
