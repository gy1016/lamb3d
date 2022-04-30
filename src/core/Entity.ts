import { Mesh } from './mesh/Mesh';
import { Material } from './material';

export class Entity {
  static id;

  id: number;
  name: string;
  mesh: Mesh;
  material: Material;

  static createId() {
    Entity.id = Entity.id + 1;
    return Entity.id;
  }

  constructor(name: string, mesh: Mesh, material: Material) {
    this.name = name;
    this.id = Entity.createId();
    this.mesh = mesh;
    this.material = material;
  }
}

Entity.id = 0;
