import { Block, IBlock, JBlock, LBlock, OBlock, RBlock, SBlock, TBlock, Tetromino } from './models/tetromino';

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

  drawTetromino(tetromino: Block): void {
    
  }
}

const tetris = new Main();
tetris.setEmptyBoard();
tetris.getRandomTetromino();