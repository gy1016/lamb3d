import { Camera } from './Camera';
import { Entity } from './Entity';

export class Scene {
  entities: Entity[];
  camera: Camera;
  // params: any;

  constructor() {
    this.entities = [];
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
