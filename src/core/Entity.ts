import { Mesh } from './graphic';
import { Material } from './material';
import { Transform } from './Transform';

/**
 * Entity classes in the scene.
 */
export class Entity {
  /** Entity count. */
  static _count: number = 1;
  /** Entity count. */
  id: number;
  name: string;
  mesh: Mesh;
  material: Material;
  parent: Entity;
  /** Entity childrens. */
  _children: Entity[];

  readonly transform: Transform;

  /**
   * An entity consists of meshes and materials.
   * @param name Entity name.
   * @param mesh Entity mesh.
   * @param material Entity material.
   */
  constructor(name: string, mesh: Mesh, material: Material) {
    this.name = name;
    this.id = Entity._count++;
    this.mesh = mesh;
    this.material = material;
    this.transform = new Transform(this);
  }
}
