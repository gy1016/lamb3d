import { Canvas } from './Canvas';

export class Scene {
  gl: WebGLRenderingContext;
  canvas: Canvas;
  // params: any;

  /**
   * constructor
   * @param canvasId : getElementById
   * @param params : scene params
   */
  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId);
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = new Canvas(canvas);
      this.canvas.resizeByClientSize();
    } else {
      throw `canvas is not a HTMLCanvasElement!`;
    }
    const gl = canvas.getContext('webgl', {});
    this.gl = gl;
  }

  /**
   * ClearColor, clearDepth, enable depth_test, clear color buffer bit and depth buffer bit
   * @param gl WebGLRenderingContext
   * @param rgba Scene background color
   */
  initRenderState(gl: WebGLRenderingContext, rgba: [number, number, number, number]) {
    gl.clearColor(rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  // draw
  draw() {
    console.log('draw');
  }
}
