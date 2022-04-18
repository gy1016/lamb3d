import { Camera } from './Camera';
import { Entity } from './Entity';

export class Scene {
  public name: string;
  public camera: Camera;
  private _rootEntities: Entity[] = [];

  get rootEntities(): Readonly<Entity[]> {
    return this._rootEntities;
  }

  // 肯定要想办法将Scene挂在到Viewer下面，此处挂载方式暂未考虑
  // 可选的做法：抽取Viewer，继承实现
  // 可选参数name
  constructor(name: string) {
    this.name = name;
  }
}
