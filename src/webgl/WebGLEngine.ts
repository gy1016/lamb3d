import { WebCanvas } from './WebCanvas';
import { WebGLContext } from './WebGLContext';

export interface IWebGLOptions {
  mode?: 'webgl' | 'webgl2';
}

export class WebGLEngine {
  public ctx: WebGLContext;
  public webCanvas: WebCanvas;

  constructor(canvas: HTMLCanvasElement | string, options: IWebGLOptions = {}) {
    let canvasEl: HTMLCanvasElement;
    if (typeof canvas === 'string') {
      // 如果用户故意不传canvas的id该怎么处理呢？
      // 暂时未处理
      canvasEl = document.getElementById(canvas) as HTMLCanvasElement;

      if (!canvasEl) {
        throw new Error(`${canvas} not is a HTMLCanvasElement id`);
      }
    } else {
      canvasEl = canvas;
    }
    const webCanvas = new WebCanvas(canvasEl);
    this.webCanvas = webCanvas;

    const ctx = new WebGLContext(canvasEl, options);
    this.ctx = ctx;
  }

  init(vshader: string, fshader: string) {
    if (!this.ctx.initShaders(vshader, fshader)) {
      console.log('Failed to intialize shaders.');
    }

    this.ctx.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.ctx.gl.clear(this.ctx.gl.COLOR_BUFFER_BIT);
  }
}
