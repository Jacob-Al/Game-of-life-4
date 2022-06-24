let LivingCreatures = require('./LivingCreatures')

module.exports = class Everythingeater extends LivingCreatures {
    constructor(x, y) {
        super(x, y)
        this.energy = 8;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var neweverythingeater = new Everythingeater(newX, newY);
            everythingEaterArr.push(neweverythingeater);
            this.energy = 8;
        }
    }

    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        } else {
            this.die();
        }
    }

    eat() {
        var emptyCells = this.chooseCell(2);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        var emptyCells1 = this.chooseCell(1);
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)];
        if (newCell) {
            this.energy++;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 12) {
                this.mul();
            }
        } else if (newCell1) {
            this.energy++;
            var newX = newCell1[0];
            var newY = newCell1[1];
            matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 12) {
                this.mul();
            }
        } else {
            this.move();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in everythingEaterArr) {
            if (
                this.x == everythingEaterArr[i].x &&
                this.y == everythingEaterArr[i].y
            ) {
                everythingEaterArr.splice(i, 1);
                break;
            }
        }
    }
}