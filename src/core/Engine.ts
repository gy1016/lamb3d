import { Canvas } from './Canvas';
import { Scene } from './Scene';
import { Time } from './base';
import { Texture2D, TextureCubeFace, TextureFormat } from './texture';
import { ShaderPool } from './shader/ShaderPool';
import { TextureCube } from './texture/TextureCube';

// 引入引擎的时候就将ShaderPool进行初始化
ShaderPool.init();

/**
 * The engine is the big steward of all content.
 */
export class Engine {
  /** The canvas corresponding to the engine. */
  protected _canvas: Canvas;
  // TODO: 考虑接入WebGL2.
  /** WebGL rendering context. */
  protected _gl: WebGLRenderingContext;

  /** Current active scene. */
  private activeScene: Scene;
  /** Used to calculate the interval between each frame rendering. */
  private _time: Time = new Time();
  /** Easy to destroy RAF. */
  private _requestId: number;

  /** Rendered 2D texture when the image has not been loaded yet. */
  _whiteTexture2D: Texture2D;
  /** Rendered cube texture when the image has not been loaded yet. */
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

  /**
   * Animation rendering.
   */
  private _animate = () => {
    this._requestId = requestAnimationFrame(this._animate);
    this.update();
  };

  /**
   * Engine instance.
   * @param canvasId HTML canvas id.
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

  /**
   * Update all data.
   */
  update() {
    const time = this._time;
    const deltaTime = time.deltaTime;
    const camera = this.activeScene.camera;
    // 更新相机位置信息
    camera.orbitControl.onUpdate(deltaTime);

    time.tick();

    this._render();
  }

  /**
   * Render based on updated data.
   */
  _render(): void {
    const gl = this._gl;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    // 这个放这没问题，不然背景画不出来
    gl.depthFunc(gl.LESS);
    // TODO: 这些状态不应该每次都进行获取
    const scene = this.activeScene;
    const globe = scene.globe;
    const camera = scene.camera;
    camera && camera.render();

    // 首先渲染地球
    const { mesh, material } = globe;
    const globeProgram = material.shader._getShaderProgram(this);
    globeProgram.uploadAll(globeProgram.sceneUniformBlock, scene.shaderData);
    globeProgram.uploadAll(globeProgram.cameraUniformBlock, camera.shaderData);
    globeProgram.uploadAll(globeProgram.materialUniformBlock, material.shaderData);
    mesh._draw(globeProgram, mesh.subMesh);

    // TODO: 这里要改成递归场景树渲染
    // entities.forEach((entity) => {
    //   const { mesh, material } = entity;
    //   // ! 这里每次都要去编译shader代码！！！
    //   // TODO: ShaderProgramPool
    //   const program = material.shader._getShaderProgram(this);
    //   // 上传相机的数据，这里还需要上传其他模块的数据，比如：场景，材质等
    //   // 场景的shaderData主要是光线
    //   // ! 这里每个实体都要
    //   program.uploadAll(program.sceneUniformBlock, scene.shaderData);
    //   program.uploadAll(program.cameraUniformBlock, camera.shaderData);
    //   program.uploadAll(program.materialUniformBlock, material.shaderData);
    //   mesh._draw(program, mesh.subMesh);
    // });

    // 最后渲染背景;
    gl.depthFunc(gl.LEQUAL);
    const { _mesh, _material } = scene.background;
    // ! 每次渲染都去实例化不可以！而且bind不应该放在构造函数，否则无法切换program
    const skyProgram = _material.shader._getShaderProgram(this);
    skyProgram.uploadAll(skyProgram.cameraUniformBlock, camera.shaderData);
    skyProgram.uploadAll(skyProgram.materialUniformBlock, _material.shaderData);
    _mesh._draw(skyProgram, _mesh.subMesh);
  }

  /**
   * Timing and rendering.
   */
  resume(): void {
    this.time.reset();
    this._requestId = requestAnimationFrame(this._animate);
  }

  /**
   * Engine run.
   */
  run() {
    this.resume();
  }
}
