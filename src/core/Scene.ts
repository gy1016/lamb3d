import { ShaderData, ShaderDataGroup, Vector3 } from '..';
import { Camera } from './Camera';
import { Entity } from './Entity';
import { PointLight } from './lighting';

export class Scene {
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Scene);

  entities: Entity[];
  camera: Camera;
  light: PointLight;
  constructor() {
    this.entities = [];
    this.light = new PointLight(new Vector3(0, 0, 10));
    this.light._updateShaderData(this.shaderData);
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
