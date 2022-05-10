import { Vector3, Vector4, Matrix4 } from '../../math';
import { ShaderDataGroup } from './enums/ShaderDataGroup';
import { Shader } from './Shader';
import { ShaderProperty } from './ShaderProperty';

export type ShaderPropertyValueType = number | Vector3 | Vector4 | Matrix4 | Int32Array | Float32Array;

export class ShaderData {
  _group: ShaderDataGroup;
  _properties: Record<number, ShaderPropertyValueType> = Object.create(null);

  constructor(group: ShaderDataGroup) {
    this._group = group;
  }

  getFloat(property: string | ShaderProperty): number {
    return this._getData(property);
  }

  setFloat(property: string | ShaderProperty, value: number): void {
    this._setData(property, value);
  }

  getMatrix(property: string | ShaderProperty): Matrix4 {
    return this._getData(property);
  }

  setMatrix(property: string | ShaderProperty, value: Matrix4): void {
    this._setData(property, value);
  }

  _getData<T extends ShaderPropertyValueType>(property: string | ShaderProperty): T {
    if (typeof property === 'string') {
      property = Shader.getPropertyByName(property);
    }
    return this._properties[property._uniqueId] as T;
  }

  _setData<T extends ShaderPropertyValueType>(property: string | ShaderProperty, value: T): void {
    if (typeof property === 'string') {
      property = Shader.getPropertyByName(property);
    }

    if (property._group !== this._group) {
      if (property._group === undefined) {
        property._group = this._group;
      } else {
        throw `Shader property ${property.name} has been used as ${ShaderDataGroup[property._group]} property.`;
      }
    }

    this._properties[property._uniqueId] = value;
  }
}
