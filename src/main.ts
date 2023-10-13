import { Block, Direction, IBlock, JBlock, LBlock, OBlock, RBlock, SBlock, TBlock } from './models/tetromino.js';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

class Main {
  board: number[][];
  tetrominoes: Block[];

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

  getRandomTetromino(): Block {
    const index = Math.floor(Math.random() * this.tetrominoes.length);
    const tetromino = this.tetrominoes[index]
    tetromino.setPosition(0, Math.floor(Math.random() * (BOARD_WIDTH - tetromino.shape[0].length + 1)));

    return tetromino;
  }

  // value 24px comes from the css for block
  drawTetromino(tetromino: Block): void {
    for (let r = 0; r < tetromino.shape.length; r++) {
      for (let c = 0; c < tetromino.shape[r].length; c++) {
        if (tetromino.shape[r][c]) {
          const element = document.createElement('div');
          element.classList.add('block');
          element.style.backgroundColor = tetromino.color;
          element.style.top = `${((tetromino.row + r) * 24)}px`;
          element.style.left = `${((tetromino.col + c) * 24)}px`;
          element.setAttribute('id', `block-${tetromino.row + r}-${tetromino.col + c}`);
          document.getElementById('game-board').appendChild(element);
        }
      }
    }
  }

  eraseTetromino(tetromino: Block): void {
    for (let r = 0; r < tetromino.shape.length; r++) {
      for (let c = 0; c < tetromino.shape[r].length; c++) {
        if (tetromino.shape[r][c] !== 0) {
          const block = document.getElementById(`block-${tetromino.row + r}-${tetromino.col + c}`)

          if (block) {
            document.getElementById('game-board').removeChild(block);
          }
        }
      }
    }
  }

  moveTetromino(block: Block, direction: Direction): void {
    let { row, col } = block;

    switch (direction) {
      case 'left':
        this.eraseTetromino(block);
        col -= 1;
        block.setPosition(row, col);
        this.drawTetromino(block);
        break;
      case 'right':
        this.eraseTetromino(block);
        col += 1;
        block.setPosition(row, col);
        this.drawTetromino(block);
        break;
      case 'down':
        this.eraseTetromino(block);
        row++;
        block.setPosition(row, col);
        this.drawTetromino(block);
        break;
        break;
    }
  }

  handleKeyPress(block: Block, event: any): void {
    switch (event.keyCode) {
      case 37:
        this.moveTetromino(block, 'left');
        break;
      case 40:
        this.moveTetromino(block, 'down');
        break;
      case 39:
        this.moveTetromino(block, 'right');
        break;
      case 38:
        this.rotateTetromino(block);
        break;
      case 32:
        break;
    }
  }

  rotateTetromino(block: Block) {
    let rotatedShape = [];

    for (let r = 0; r < block.shape[0].length; r++) {
      let row = [];
      for (let c = block.shape.length - 1; c >= 0; c--) {
        row.push(block.shape[c][r]);
      }
      rotatedShape.push(row);
    }

    this.eraseTetromino(block);
    block.shape = rotatedShape;
    this.drawTetromino(block);
  }
}

const tetris = new Main();
tetris.setEmptyBoard();
const block = tetris.getRandomTetromino();
tetris.drawTetromino(block);
document.addEventListener('keydown', (event) => tetris.handleKeyPress(block, event));
setInterval(() => tetris.moveTetromino(block, 'down'), 500);