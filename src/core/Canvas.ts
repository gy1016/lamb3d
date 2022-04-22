export class Canvas {
  gl: WebGLRenderingContext;
  _webCanvas: HTMLCanvasElement;

  private _width: number;
  private _height: number;

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (this._width !== value) {
      this._width = value;
    }
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (this._height !== value) {
      this._height = value;
    }
  }

  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId);
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(`${canvasId} is not a HTMLCanvasElement`);
    }
    this._webCanvas = canvas;
    this.gl = canvas.getContext('webgl');
    if (this.gl === null) {
      throw new Error(`Unable to initialize the webgl context`);
    }
  }

  resizeByClientSize(pixelRatio: number = window.devicePixelRatio): void {
    const webCanvas = this._webCanvas;
    if (webCanvas instanceof HTMLCanvasElement) {
      this.width = webCanvas.clientWidth * pixelRatio;
      this.height = webCanvas.clientHeight * pixelRatio;
    }
  }
}
