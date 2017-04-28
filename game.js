const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.stacks = [[3, 2, 1], [], []];
  }

  run(completeCallback) {
    this.promptMove(completionCallback);
  }

  promptMove(completeCallback) {
    console.log(this.stacks);
    reader.question("Please select a tower to move from: ", (startTowerIdx) => {
      reader.question("Please select a tower to move to: ", (endTowerIdx) => {
        if (!this.move(startTowerIdx, endTowerIdx)) {
          console.log("Invalid Move!");
        }
        if (this.isWon()) {
          console.log("You win!");
          completionCallback();
        } else {
          this.run(completeCallback);
        }
      });
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    const startTower = this.stacks[startTowerIdx];
    const endTower = this.stacks[endTowerIdx];
    if (startTowerIdx < 0 || startTowerIdx > 2 ||
      endTowerIdx < 0 || endTowerIdx > 2 ||
      startTower.length === 0) {
        return false;
    }
    if (endTower.length > 0 &&
      endTower[endTower.length - 1] < startTower[startTower.length - 1]) {
      return false;
    }
    return true;
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  }

  isWon() {
    if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
      return true;
    } else {
      return false;
    }
  }

  print() {
    console.log(JSON.stringify(this.stacks));
  }
}

function completionCallback() {
  reader.close();
}

let g = new Game;
g.run(completionCallback);
