import { immerable } from "immer";

export default function Point(x, y) {
    return new Point.class(x, y)
}

Point.class = class {
    [immerable] = true;

    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    scale(scalar) {
        return Point(this.x * scalar, this.y * scalar);
    }

    add(point) {
        return Point(this.x + point.x, this.y + point.y);
    }

    subtract(point) {
        return Point(this.x - point.x, this.y - point.y);
    }

    map(fn) {
        return Point(fn(this.x), fn(this.y));
    }

    mapX(fn) {
        return Point(fn(this.x), this.y);
    }

    mapY(fn) {
        return Point(this.x, fn(this.y));
    }

    equals(point) {
        return this.x === point.x && this.y === point.y;
    }

    up() {
        return this.add(Point(0, -1));
    }

    down() {
        return this.add(Point(0, 1));
    }

    left() {
        return this.add(Point(-1, 0));
    }

    right() {
        return this.add(Point(1, 0));
    }
}

Point.origin = function() {
    return Point(0, 0);
}

Point.from = function(obj) {
    return Point(obj.x, obj.y);
}
