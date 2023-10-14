import { Block, Direction, IBlock, JBlock, LBlock, OBlock, RBlock, SBlock, TBlock, Shape } from './models/tetromino.js';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

class Main {
  board: number[][];
  tetrominoes: Block[];
  currentTetromino: Block;

  constructor() {
    this.board = [];
    this.tetrominoes = [
      new OBlock('#ffd800'),
      new TBlock('#7925dd'),
      new SBlock('orange'),
      new RBlock('red'),
      new JBlock('green'),
      new LBlock('#ff6400'),
      new IBlock('#00b5ff')
    ];
  }

  setEmptyBoard(): void {
    for (let row = 0; row < BOARD_HEIGHT; row++) {
      this.board[row] = [];
      for (let col = 0; col < BOARD_WIDTH; col++) {
        this.board[row][col] = 0;
      }
    }
  }

  getRandomTetromino(): void {
    const index = Math.floor(Math.random() * this.tetrominoes.length);
    const tetromino = this.tetrominoes[index]
    tetromino.setPosition(0, Math.floor(Math.random() * (BOARD_WIDTH - tetromino.shape[0].length + 1)));

    this.currentTetromino = tetromino;
  }

  // value 24px comes from the css for block
  drawTetromino(): void {
    for (let r = 0; r < this.currentTetromino.shape.length; r++) {
      for (let c = 0; c < this.currentTetromino.shape[r].length; c++) {
        if (this.currentTetromino.shape[r][c]) {
          const element = document.createElement('div');
          element.classList.add('block');
          element.style.backgroundColor = this.currentTetromino.color;
          element.style.top = `${((this.currentTetromino.row + r) * 24)}px`;
          element.style.left = `${((this.currentTetromino.col + c) * 24)}px`;
          element.setAttribute('id', `block-${this.currentTetromino.row + r}-${this.currentTetromino.col + c}`);
          document.getElementById('game-board').appendChild(element);
        }
      }
    }
  }

  eraseTetromino(): void {
    for (let r = 0; r < this.currentTetromino.shape.length; r++) {
      for (let c = 0; c < this.currentTetromino.shape[r].length; c++) {
        if (this.currentTetromino.shape[r][c] !== 0) {
          const block = document.getElementById(`block-${this.currentTetromino.row + r}-${this.currentTetromino.col + c}`)

          if (block) {
            document.getElementById('game-board').removeChild(block);
          }
        }
      }
    }
  }

  moveTetromino(direction: Direction): void {
    let { row, col } = this.currentTetromino;

    switch (direction) {
      case 'left':
        if (this.isMovementAllowed(0, -1)) {
          this.eraseTetromino();
          col -= 1;
          this.currentTetromino.setPosition(row, col);
          this.drawTetromino();
        }
        break;
      case 'right':
        if (this.isMovementAllowed(0, 1)) {
          this.eraseTetromino();
          col += 1;
          this.currentTetromino.setPosition(row, col);
          this.drawTetromino();
        }
        break;
      case 'down':
        if (this.isMovementAllowed(1, 0)) {
          this.eraseTetromino();
          row++;
          this.currentTetromino.setPosition(row, col);
          this.drawTetromino();
        } else {
          this.lockTetromino();
        }
        break;
    }
  }

  handleKeyPress(event: any): void {
    switch (event.keyCode) {
      case 37:
        this.moveTetromino('left');
        break;
      case 40:
        this.moveTetromino('down');
        break;
      case 39:
        this.moveTetromino('right');
        break;
      case 38:
        this.rotateTetromino();
        break;
      case 32:
        break;
    }
  }

  rotateTetromino(): void {
    let rotatedShape = [];

    for (let r = 0; r < this.currentTetromino.shape[0].length; r++) {
      let row = [];
      for (let c = this.currentTetromino.shape.length - 1; c >= 0; c--) {
        row.push(this.currentTetromino.shape[c][r]);
      }
      rotatedShape.push(row);
    }

    if (this.isRotationAllowed(rotatedShape)) {
      this.eraseTetromino();
      this.currentTetromino.shape = rotatedShape;
      this.drawTetromino();
    }
  }

  isMovementAllowed(rowOffset: number, colOffset: number): boolean {
    for (let r = 0; r < this.currentTetromino.shape.length; r++) {
      for (let c = 0; c < this.currentTetromino.shape[r].length; c++) {
        if (this.currentTetromino.shape[r][c] !== 0) {
          let row = this.currentTetromino.row + r + rowOffset;
          let col = this.currentTetromino.col + c + colOffset;

          if (row >= BOARD_HEIGHT || col < 0 || col >= BOARD_WIDTH || (row >= 0 && this.board[row][col] !== 0)) {
            return false;
          }
        }
      } 
    }

    return true;
  }

  isRotationAllowed(shape: Shape): boolean {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] !== 0) {
          let row = this.currentTetromino.row + r;
          let col = this.currentTetromino.col + c;

          if (row >= BOARD_HEIGHT || col < 0 || col >= BOARD_WIDTH || (row >= 0 && this.board[row][col] !== 0)) {
            return false;
          }
        }
      }
    }

    return true;
  }

  lockTetromino(): void {
    for (let r = 0; r < this.currentTetromino.shape.length; r++) {
      for (let c = 0; c < this.currentTetromino.shape[r].length; c++) {
        if (this.currentTetromino.shape[r][c] !== 0) {
          let row = this.currentTetromino.row + r;
          let col = this.currentTetromino.col + c;
          this.board[row][col] = this.currentTetromino.shape[r][c];
        }
      }
    }

    this.getRandomTetromino();
  }
}

const tetris = new Main();
tetris.setEmptyBoard();
tetris.getRandomTetromino();
tetris.drawTetromino();
document.addEventListener('keydown', (event) => tetris.handleKeyPress(event));
setInterval(() => tetris.moveTetromino('down'), 500);