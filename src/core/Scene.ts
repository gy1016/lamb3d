import { Engine } from './Engine';
import { Background } from './Background';
import { Camera } from './Camera';
import { Color, Vector3 } from '../math';
import { ShaderData, ShaderDataGroup } from './shader';
import { AmbientLight, PointLight } from './lighting';
import { RayCastedGlobe } from '../geographic/RayCastedGlobe';

// TODO: 抽象出来一个EngineObject!!!!
export class Scene {
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Scene);
  /** The engine the scene belongs to. */
  engine: Engine;
  /** Cameras in the scene, we only consider the case where there is only one camera in the scene. */
  camera: Camera;
  // TODO: 要想在这里使用你就的先抽象出来
  /** The background of the scene, the default is the skybox. */
  background: Background;
  // TODO: 可能有多个点光源
  /** Point lights in the scene. */
  pointLight: PointLight;
  /** Ambient light in the scene. */
  ambientLight: AmbientLight;
  /** Earth is the root entity in the scene. */
  private readonly _globe: RayCastedGlobe;

  get globe() {
    return this._globe;
  }

  /**
   * The camera and the earth are loaded by default inside the constructor.
   * @param engine The engine the scene belongs to.
   */
  constructor(engine: Engine) {
    this.engine = engine;

    // 初始化场景相机
    this.camera = new Camera(engine);
    this.camera.transform.position = new Vector3(10, 10, 10);
    this.camera.transform.lookAt(new Vector3(0, 0, 0));

    // 初始化场景地球
    this._globe = new RayCastedGlobe(engine);
    this.globe.uploadShaderData(this.shaderData);

    // 初始化背景，即天空盒
    this.background = new Background(this.engine);

    // 初始化场景点光源
    this.pointLight = new PointLight(new Vector3(0, 0, 10));
    this.pointLight._updateShaderData(this.shaderData);

    // 初始化场景环境光
    this.ambientLight = new AmbientLight(new Color(0.2, 0.2, 0.2, 1));
    this.ambientLight._updateShaderData(this.shaderData);
  }

  // ! 同级不支持添加其他实体，后续可修改
}
