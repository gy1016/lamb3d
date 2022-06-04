import { Color, ShaderData, ShaderDataGroup, Vector3 } from '..';
import { Camera } from './Camera';
import { Entity } from './Entity';
import { AmbientLight, PointLight } from './lighting';

export class Scene {
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Scene);

  entities: Entity[];
  camera: Camera;
  pointLight: PointLight;
  ambientLight: AmbientLight;

  constructor() {
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
