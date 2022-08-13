import { Mesh } from './graphic';
import { Material } from './material';
import { Transform } from './Transform';

export class Entity {
  static _count: number = 1;

  id: number;
  name: string;
  mesh: Mesh;
  material: Material;
  parent: Entity;
  _children: Entity[];

  readonly transform: Transform;

  constructor(name: string, mesh: Mesh, material: Material) {
    this.name = name;
    this.id = Entity._count++;
    this.mesh = mesh;
    this.material = material;
    this.transform = new Transform(this);
  }
}
