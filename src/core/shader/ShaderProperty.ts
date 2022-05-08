export class ShaderProperty {
  private static _propertyNameCounter: number = 0;

  _uniqueId: number;

  readonly name: string;

  constructor(name: string) {
    this.name = name;
    this._uniqueId = ShaderProperty._propertyNameCounter++;
  }
}
