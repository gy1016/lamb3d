import { Vector3, Color } from '@lamb3d/math';
import { Shader, ShaderData, ShaderProperty } from '../shader';
import { Light } from './Light';

export class PointLight extends Light {
  // 因为可能有多个点光源
  private static _colorProperty: ShaderProperty = Shader.getPropertyByName('u_pointLightColor');
  private static _positionProperty: ShaderProperty = Shader.getPropertyByName('u_pointLightPosition');

  private static _combinedData = {
    color: new Float32Array(3),
    position: new Float32Array(3),
  };

  // 白光和什么光相乘，都保留颜色
  color: Color = new Color(1, 1, 1, 1);
  intensity: number = 1.0;

  private _lightColor: Color = new Color(1, 1, 1, 1);

  get position(): Vector3 {
    return this.transform.worldPosition;
  }

  /**
   * Get the final light color.
   */
  get lightColor(): Color {
    this._lightColor.r = this.color.r * this.intensity;
    this._lightColor.g = this.color.g * this.intensity;
    this._lightColor.b = this.color.b * this.intensity;
    this._lightColor.a = this.color.a * this.intensity;
    return this._lightColor;
  }

  constructor(position: Vector3) {
    super();
    this.transform.worldPosition = position;
  }

  _updateShaderData(shaderData: ShaderData): void {
    this._appendData();
    const data = PointLight._combinedData;

    shaderData.setFloatArray(PointLight._colorProperty, data.color);
    shaderData.setFloatArray(PointLight._positionProperty, data.position);
  }

  _appendData(): void {
    const data = PointLight._combinedData;
    const lightColor = this.lightColor;
    const lightPosition = this.position;

    data.color[0] = lightColor.r;
    data.color[1] = lightColor.g;
    data.color[2] = lightColor.b;
    data.position[0] = lightPosition.x;
    data.position[1] = lightPosition.y;
    data.position[2] = lightPosition.z;
  }
}
