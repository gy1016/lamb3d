import { EngineObject } from './base/EngineObject';
import { Engine } from './Engine';

export class Entity extends EngineObject {
  /** The name of entity. */
  name: string;

  _children: Entity[] = [];
  _isRoot: boolean = false;
  _isActive: boolean = true;

  private _parent: Entity = null;

  /**
   * Whether to activate locally.
   */
  get isActive(): boolean {
    return this._isActive;
  }

  /**
   * The parent entity.
   */
  get parent(): Entity {
    return this._parent;
  }

  /**
   * The children entities
   */
  get children(): Readonly<Entity[]> {
    return this._children;
  }

  /**
   * Number of the children entities
   */
  get childCount(): number {
    return this._children.length;
  }

  constructor(engine: Engine, name?: string) {
    super(engine);
    this.name = name;
  }
}
