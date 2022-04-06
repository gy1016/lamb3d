import { Canvas } from '../core/Canvas';

export class WebCanvas implements Canvas {
  _webCanvas: HTMLCanvasElement;

  private _width: number;
  private _height: number;

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (this._width !== value) {
      this._webCanvas.width = value;
      this._width = value;
    }
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (this._height !== value) {
      this._webCanvas.height = value;
      this._height = value;
    }
  }

  resizeByClientSize() {
    const webCanvas = this._webCanvas;
    if (webCanvas instanceof HTMLCanvasElement) {
      this.width = webCanvas.clientWidth;
      this.height = webCanvas.clientHeight;
    }
  }

  constructor(webCanvas: HTMLCanvasElement) {
    const width = webCanvas.width;
    const height = webCanvas.height;
    this._webCanvas = webCanvas;
    this._width = width;
    this._height = height;
  }
}
