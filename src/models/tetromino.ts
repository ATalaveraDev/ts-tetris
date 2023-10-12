type Shape = number[][];
export interface Tetromino {
  shape: Shape;
  color: string;
};

export class Block {
  shape: Shape;
  color: string;
  private _row: number;
  private _col: number;

  set row(value: number) {
    this._row = value;
  }
  
  get row(): number {
    return this._row;
  }

  set col(value: number) {
    this._col = value;
  }

  get col(): number {
    return this._col;
  }

  setPosition(row: number, col: number): void {
    this.row = row;
    this.col = col;
  }
}

export class OBlock extends Block implements Tetromino {
  constructor(public color: string) {
    super();
    this.shape = [
      [1, 1],
      [1, 1]
    ];
  }
}

export class TBlock extends Block implements Tetromino {
  constructor(public color: string) {
    super();
    this.shape = [
      [0, 2, 0],
      [2, 2, 2]
    ];
  }
}

export class SBlock extends Block implements Tetromino {
  constructor(public color: string) {
    super();
    this.shape = [
      [0, 3, 3],
      [3, 3, 0]
    ];
  }
}

export class RBlock extends Block implements Tetromino {
  constructor(public color: string) {
    super();
    this.shape = [
      [4, 4, 0],
      [0, 4, 4]
    ];
  }
}

export class JBlock extends Block implements Tetromino {
  constructor(public color: string) {
    super();
    this.shape = [
      [5, 0, 0],
      [5, 5, 5]
    ];
  }
}

export class LBlock extends Block implements Tetromino {
  constructor(public color: string) {
    super();
    this.shape = [
      [0, 0, 6],
      [6, 6, 6]
    ];
  }
}

export class IBlock extends Block implements Tetromino {
  constructor(public color: string) {
    super();
    this.shape = [
      [7, 7, 7, 7]
    ];
  }
}