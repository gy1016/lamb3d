import { Scene } from './Scene';

export class Entity {
  name: string;
  // 还应该有个layer，暂时不考虑
  _children: Entity[] = [];
  _scene: Scene;

  get Scene(): Scene {
    return this._scene;
  }

  constructor(name: string) {
    this.name = name;
  }
}
