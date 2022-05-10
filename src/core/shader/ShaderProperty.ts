import { ShaderDataGroup } from './enums/ShaderDataGroup';

export class ShaderProperty {
  private static _propertyNameCounter: number = 0;

  _uniqueId: number;
  _group: ShaderDataGroup;

  readonly name: string;

  constructor(name: string) {
    this.name = name;
    this._uniqueId = ShaderProperty._propertyNameCounter++;
  }
}
