import { Canvas } from './Canvas';
import { Scene } from './Scene';

export class Engine {
  protected _canvas: Canvas;
  protected _gl: WebGLRenderingContext;
  private activeScene: Scene;
  private _requestId: number;

  get canvas(): Canvas {
    return this._canvas;
  }

  get gl(): WebGLRenderingContext {
    return this._gl;
  }

  private _animate = () => {
    this._requestId = requestAnimationFrame(this._animate);
    this.update();
  };

  /**
   * constructor
   * @param canvasId : getElementById
   * @param params : engine params
   */
  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId);
    if (canvas instanceof HTMLCanvasElement) {
      this._canvas = new Canvas(canvas);
      this._canvas.resizeByClientSize();
    } else {
      throw `canvas is not a HTMLCanvasElement!`;
    }
    const gl = canvas.getContext('webgl', {});
    if (!gl) throw `init webgl rendering context failure!`;
    this._gl = gl;
    this.activeScene = new Scene();
  }

  update() {
    console.log('update');
  }

  run() {
    const gl = this._gl;
    const entities = this.activeScene.entities;
    const camera = this.activeScene.camera;
    camera && camera.render();
    entities.forEach((entity) => {
      const { mesh, material } = entity;
      const program = material.shader._getShaderProgram(gl);
      program.uploadAll(program.cameraUniformBlock, camera.shaderData);
      mesh._draw(program, mesh.subMesh);
    });
  }
}
