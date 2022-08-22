import { Engine } from './Engine';
import { Background } from './Background';
import { Camera } from './Camera';
import { earthUrl } from '../config';
import { Entity } from './Entity';
import { PrimitiveMesh } from './mesh';
import { ImageMaterial } from './material';
import { Color, Vector3 } from '../math';
import { Shader, ShaderData, ShaderDataGroup } from './shader';
import { AmbientLight, PointLight } from './lighting';

// TODO: 抽象出来一个EngineObject!!!!
export class Scene {
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Scene);
  /** The engine the scene belongs to. */
  engine: Engine;
  /** A collection of entities in the scene, which is a tree. */
  entities: Entity[];
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
  private _rootEntity: Entity;

  get rootEntity() {
    const shader = Shader.find('common');
    const material = new ImageMaterial(this.engine, shader, earthUrl);
    const mesh = PrimitiveMesh.createSphereByParamEquation(this.engine, 1, 40);
    this._rootEntity = new Entity('rootEntity', mesh, material);
    return this._rootEntity;
  }

  /**
   * The camera and the earth are loaded by default inside the constructor.
   * @param engine The engine the scene belongs to.
   */
  constructor(engine: Engine) {
    this.engine = engine;

    this.camera = new Camera(engine);
    this.camera.transform.position = new Vector3(0, 0, 3);
    this.camera.transform.lookAt(new Vector3(0, 0, 0));

    this.background = new Background(this.engine);
    this.entities = [this.rootEntity];

    this.pointLight = new PointLight(new Vector3(0, 0, 10));
    this.pointLight._updateShaderData(this.shaderData);

    this.ambientLight = new AmbientLight(new Color(0.2, 0.2, 0.2, 1));
    this.ambientLight._updateShaderData(this.shaderData);
  }

  /**
   * Entities that need to be loaded into the scene, at the same level as the Earth.
   * @param entity Entity.
   * @returns The number of entities.
   */
  addEntity(entity: Entity): number {
    if (entity instanceof Entity) {
      if (this.entities == null) {
        this.entities = [];
      }
      this.entities.push(entity);
    }
    return this.entities.length;
  }
}
