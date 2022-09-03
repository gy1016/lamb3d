import { Vector3 } from '../../math';
import { Color } from '../../math/Color';
import { Shader, ShaderData, ShaderProperty } from '../shader';
import { Light } from './Light';

/**
 * Point light.
 */
export class PointLight extends Light {
  // 因为可能有多个点光源
  /** Get the address of the point light color uniform variable in the shader. */
  private static _colorProperty: ShaderProperty = Shader.getPropertyByName('u_pointLightColor');
  /** Get the address of the uniform variable of the point light position in the shader. */
  private static _positionProperty: ShaderProperty = Shader.getPropertyByName('u_pointLightPosition');
  /** Blend object of color and position. */
  private static _combinedData = {
    color: new Float32Array(3),
    position: new Float32Array(3),
  };

  // 白光不管和什么光相乘，都保留颜色
  /** The color of the light, the default is white light. */
  color: Color = new Color(1, 1, 1, 1);
  /** Intensity of light. */
  intensity: number = 1.0;

  /** Final light color. */
  private _lightColor: Color = new Color(1, 1, 1, 1);

  /** Get the position of a point light. */
  get position(): Vector3 {
    return this.transform.worldPosition;
  }

  set position(value: Vector3) {
    if (this.position !== value) {
      value.cloneTo(this.transform.worldPosition);
    }
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

  /**
   * Set variable value in shader.
   * @param shaderData Shader data.
   */
  _updateShaderData(shaderData: ShaderData): void {
    this._appendData();
    const data = PointLight._combinedData;

    shaderData.setFloatArray(PointLight._colorProperty, data.color);
    shaderData.setFloatArray(PointLight._positionProperty, data.position);
  }

  /**
   * Populate federated data.
   */
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
