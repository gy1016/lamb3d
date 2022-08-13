import { Canvas } from './Canvas';
import { Scene } from './Scene';
import { Time } from './base';
import { Texture2D, TextureCubeFace, TextureFormat } from './texture';
import { ShaderPool } from './shader/ShaderPool';
import { TextureCube } from './texture/TextureCube';

ShaderPool.init();

export class Engine {
  protected _canvas: Canvas;
  protected _gl: WebGLRenderingContext;

  private activeScene: Scene;
  private _time: Time = new Time();
  private _requestId: number;

  _whiteTexture2D: Texture2D;
  _whiteTextureCube: TextureCube;

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
    // ! 这样实例化场景好吗？？？
    this.activeScene = new Scene(this);

    const whitePixel = new Uint8Array([255, 255, 255, 255]);
    const whiteTexture2D = new Texture2D(this, 1, 1, TextureFormat.R8G8B8A8, false);
    whiteTexture2D.setPixelBuffer(whitePixel);

    const whiteTextureCube = new TextureCube(this, 1, TextureFormat.R8G8B8A8, false);
    whiteTextureCube.setPixelBuffer(TextureCubeFace.PositiveX, whitePixel);
    whiteTextureCube.setPixelBuffer(TextureCubeFace.NegativeX, whitePixel);
    whiteTextureCube.setPixelBuffer(TextureCubeFace.PositiveY, whitePixel);
    whiteTextureCube.setPixelBuffer(TextureCubeFace.NegativeY, whitePixel);
    whiteTextureCube.setPixelBuffer(TextureCubeFace.PositiveZ, whitePixel);
    whiteTextureCube.setPixelBuffer(TextureCubeFace.NegativeZ, whitePixel);

    this._whiteTexture2D = whiteTexture2D;
    this._whiteTextureCube = whiteTextureCube;
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
    gl.depthFunc(gl.LESS);
    const scene = this.activeScene;
    const entities = scene.entities;
    const camera = scene.camera;
    camera && camera.render();
    entities.forEach((entity) => {
      // TODO: 背景的Mesh怎么渲染呢？？？这是一个问题？？
      const { mesh, material } = entity;
      const program = material.shader._getShaderProgram(this);
      // 上传相机的数据，这里还需要上传其他模块的数据，比如：场景，材质等
      // 场景的shaderData主要是光线
      program.uploadAll(program.sceneUniformBlock, scene.shaderData);
      program.uploadAll(program.cameraUniformBlock, camera.shaderData);
      program.uploadAll(program.materialUniformBlock, material.shaderData);
      mesh._draw(program, mesh.subMesh);
    });
    // 最后渲染背景
    gl.depthFunc(gl.LEQUAL);
    const { _mesh, _material } = scene.background;
    // ! 每次渲染都去实例化不可以！而且bind不应该放在构造函数，否则无法切换program
    const skyProgram = _material.shader._getShaderProgram(this);
    skyProgram.uploadAll(skyProgram.cameraUniformBlock, camera.shaderData);
    skyProgram.uploadAll(skyProgram.materialUniformBlock, _material.shaderData);
    _mesh._draw(skyProgram, _mesh.subMesh);
  }

  resume(): void {
    this.time.reset();
    this._requestId = requestAnimationFrame(this._animate);
  }

  run() {
    this.resume();
  }
}
