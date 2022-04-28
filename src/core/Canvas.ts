export class Canvas {
  _canvas: HTMLCanvasElement;

  private _width: number;
  private _height: number;

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (this._width !== value) {
      this._canvas.width = value;
      this._width = value;
    }
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (this._height !== value) {
      this._canvas.height = value;
      this._height = value;
    }
  }

  resizeByClientSize(pixelRatio: number = window.devicePixelRatio): void {
    const webCanvas = this._canvas;
    if (webCanvas instanceof HTMLCanvasElement) {
      this.width = webCanvas.clientWidth * pixelRatio;
      this.height = webCanvas.clientHeight * pixelRatio;
    }
  }

  constructor(canvas: HTMLCanvasElement) {
    const width = canvas.width;
    const height = canvas.height;
    this._canvas = canvas;
    this._width = width;
    this._height = height;
  }
}
