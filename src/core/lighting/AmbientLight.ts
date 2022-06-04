import { Shader, ShaderData, ShaderProperty } from '../shader';
import { Color } from '../../math/Color';

// 这个不用继承Light，因为只需要颜色
export class AmbientLight {
  private static _colorProperty: ShaderProperty = Shader.getPropertyByName('u_ambientightColor');

  color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  _updateShaderData(shaderData: ShaderData): void {
    const color = this.color;
    const ambientColor = new Float32Array([color.r, color.g, color.b]);
    shaderData.setFloatArray(AmbientLight._colorProperty, ambientColor);
  }
}
