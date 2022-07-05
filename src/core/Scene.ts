import { Color, Engine, ShaderData, ShaderDataGroup, Vector3 } from '..';
import { Background } from './Background';
import { Camera } from './Camera';
import { Entity } from './Entity';
import { AmbientLight, PointLight } from './lighting';

// TODO: 抽象出来一个EngineObject!!!!
export class Scene {
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Scene);

  engine: Engine;
  entities: Entity[];
  camera: Camera;
  // TODO: 要想在这里使用你就的先抽象出来
  // readonly background: Background = new Background(this.engine);
  background: Background;
  pointLight: PointLight;
  ambientLight: AmbientLight;

  constructor(engine: Engine) {
    this.engine = engine;
    this.background = new Background(this.engine);
    this.entities = [];

    this.pointLight = new PointLight(new Vector3(0, 0, 10));
    this.pointLight._updateShaderData(this.shaderData);

    this.ambientLight = new AmbientLight(new Color(0.2, 0.2, 0.2, 1));
    this.ambientLight._updateShaderData(this.shaderData);
  }

  addEntity(entity: Entity) {
    if (entity instanceof Entity) {
      if (this.entities == null) {
        this.entities = [];
      }
      this.entities.push(entity);
    }
  }
}
