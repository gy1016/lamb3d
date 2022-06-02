import { Canvas } from './Canvas';
import { Scene } from './Scene';
import { Time } from './base';
import { Texture2D, TextureFormat } from './texture';

export class Engine {
  protected _canvas: Canvas;
  protected _gl: WebGLRenderingContext;

  private activeScene: Scene;
  private _time: Time = new Time();
  private _requestId: number;

  _whiteTexture2D: Texture2D;

  get canvas(): Canvas {
    return this._canvas;
  }

  get gl(): WebGLRenderingContext {
    return this._gl;
  }

  get time(): Time {
    return this._time;
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

    const whitePixel = new Uint8Array([0, 0, 0, 255]);
    const whiteTexture2D = new Texture2D(this, 1, 1, TextureFormat.R8G8B8A8, false);
    whiteTexture2D.setPixelBuffer(whitePixel);

    this._whiteTexture2D = whiteTexture2D;
  }

  update() {
    const time = this._time;
    const deltaTime = time.deltaTime;
    const camera = this.activeScene.camera;
    camera.orbitControl.onUpdate(deltaTime);

    time.tick();

    this._render();
  }

  _render(): void {
    const gl = this._gl;
    const entities = this.activeScene.entities;
    const camera = this.activeScene.camera;
    camera && camera.render();
    entities.forEach((entity) => {
      const { mesh, material } = entity;
      const program = material.shader._getShaderProgram(this);
      // 上传相机的数据，这里还需要上传其他模块的数据，比如：场景，材质等
      program.uploadAll(program.cameraUniformBlock, camera.shaderData);
      program.uploadAll(program.materialUniformBlock, material.shaderData);
      mesh._draw(program, mesh.subMesh);
    });
  }

  resume(): void {
    this.time.reset();
    this._requestId = requestAnimationFrame(this._animate);
  }

  run() {
    this.resume();
  }
}
