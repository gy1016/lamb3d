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
  /** Entity name. */
  name: string;
  /** Entity mesh. */
  mesh: Mesh;
  /** Entity material. */
  material: Material;
  /** Parent entity id. */
  parent: Entity;
  /** Entity childrens. */
  _children: Entity[];

  /** Entity ransform. */
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

  /**
   * Add child entities.
   * @param entity Child entities to be loaded.
   * @returns The number of child entities.
   */
  addEntity(entity: Entity): number {
    if (entity instanceof Entity) {
      if (this._children == null) {
        this._children = [];
      }
      this._children.push(entity);
    }
    return this._children.length;
  }
}
