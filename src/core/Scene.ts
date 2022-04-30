import { Canvas } from './Canvas';
import { Entity } from './Entity';
import { Render } from './Render';

export class Scene {
  gl: WebGLRenderingContext;
  canvas: Canvas;
  entities: Entity[];
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
    this.entities = [];
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

  addEntity(entity: Entity) {
    if (entity instanceof Entity) {
      if (this.entities == null) {
        this.entities = [];
      }
      this.entities.push(entity);
    }
  }

  run() {
    const gl = this.gl;
    const enti = this.entities.pop();

    const n = Render.drawRender(gl, enti);

    // We may have multiple programs, the writing here is not standardized,
    // and subsequent modifications will be made
    gl.useProgram(Render.shaderProgram.glProgram);

    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  }
}
