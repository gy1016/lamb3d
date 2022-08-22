/**
 * Encapsulate canvas tag.
 */
export class Canvas {
  /** HTML canvas element. */
  _canvas: HTMLCanvasElement;

  private _width: number;
  private _height: number;

  /** Canvas element width. */
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (this._width !== value) {
      this._canvas.width = value;
      this._width = value;
    }
  }

  /** Canvas element height. */
  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (this._height !== value) {
      this._canvas.height = value;
      this._height = value;
    }
  }

  /**
   * Resize by client size.
   * @param pixelRatio Device pixel ratio.
   */
  resizeByClientSize(pixelRatio: number = window.devicePixelRatio): void {
    const webCanvas = this._canvas;
    if (webCanvas instanceof HTMLCanvasElement) {
      this.width = webCanvas.clientWidth * pixelRatio;
      this.height = webCanvas.clientHeight * pixelRatio;
    }
  }

  /**
   * Wrap the canvas element.
   * @param canvas HTML canvas element.
   */
  constructor(canvas: HTMLCanvasElement) {
    const width = canvas.width;
    const height = canvas.height;
    this._canvas = canvas;
    this._width = width;
    this._height = height;
  }
}
