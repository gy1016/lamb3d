import { Matrix4, Vector2, Vector3, Vector4, Color } from '../../math';
import { Texture } from '../texture';
import { ShaderPropertyValueType } from './ShaderData';
import { ColorSpace } from '../enums/ColorSpace';

/**
 * The encapsulation of each uniform variable, including its cache value, data upload method, and data storage address.
 */
export class ShaderUniform {
  name: string;
  propertyId: number;
  location: WebGLUniformLocation;
  applyFunc: (shaderUniform: ShaderUniform, value: ShaderPropertyValueType) => void;
  cacheValue: number | Vector2 | Vector3 | Vector4;
  textureIndex: GLenum | GLenum[];
  textureDefault: Texture | Texture[];

  private _gl: WebGLRenderingContext;
  private _colorSpace: ColorSpace;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
  }

  upload1f(shaderUniform: ShaderUniform, value: number): void {
    if (this.cacheValue !== value) {
      this._gl.uniform1f(shaderUniform.location, value);
      this.cacheValue = value;
    }
  }

  upload1fv(shaderUniform: ShaderUniform, value: Float32Array): void {
    this._gl.uniform1fv(shaderUniform.location, value);
  }

  upload2fv(shaderUniform: ShaderUniform, value: Float32Array): void {
    this._gl.uniform2fv(shaderUniform.location, value);
  }

  upload3f(shaderUniform: ShaderUniform, value: Vector3 | Vector4 | Color): void {
    const cacheValue = <Vector3>this.cacheValue;
    if ((<Color>value).r !== undefined) {
      if (cacheValue.x !== (<Color>value).r || cacheValue.y !== (<Color>value).g || cacheValue.z !== (<Color>value).b) {
        if (this._colorSpace === ColorSpace.Linear) {
          this._gl.uniform3f(
            shaderUniform.location,
            Color.gammaToLinearSpace((<Color>value).r),
            Color.gammaToLinearSpace((<Color>value).g),
            Color.gammaToLinearSpace((<Color>value).b),
          );
        } else {
          this._gl.uniform3f(shaderUniform.location, (<Color>value).r, (<Color>value).g, (<Color>value).b);
        }
        cacheValue.x = (<Color>value).r;
        cacheValue.y = (<Color>value).g;
        cacheValue.z = (<Color>value).b;
      }
    } else {
      if (
        cacheValue.x !== (<Vector3>value).x ||
        cacheValue.y !== (<Vector3>value).y ||
        cacheValue.z !== (<Vector3>value).z
      ) {
        this._gl.uniform3f(shaderUniform.location, (<Vector3>value).x, (<Vector3>value).y, (<Vector3>value).z);
        cacheValue.x = (<Vector3>value).x;
        cacheValue.y = (<Vector3>value).y;
        cacheValue.z = (<Vector3>value).z;
      }
    }
  }

  upload3fv(shaderUniform: ShaderUniform, value: Float32Array): void {
    this._gl.uniform3fv(shaderUniform.location, value);
  }

  upload4fv(shaderUniform: ShaderUniform, value: Float32Array): void {
    this._gl.uniform4fv(shaderUniform.location, value);
  }

  upload1i(shaderUniform: ShaderUniform, value: number): void {
    if (this.cacheValue !== value) {
      this._gl.uniform1i(shaderUniform.location, value);
      this.cacheValue = value;
    }
  }

  upload1iv(shaderUniform: ShaderUniform, value: Int32Array): void {
    this._gl.uniform1iv(shaderUniform.location, value);
  }

  upload2iv(shaderUniform: ShaderUniform, value: Int32Array): void {
    this._gl.uniform2iv(shaderUniform.location, value);
  }

  upload3iv(shaderUniform: ShaderUniform, value: Int32Array): void {
    this._gl.uniform3iv(shaderUniform.location, value);
  }

  upload4iv(shaderUniform: ShaderUniform, value: Int32Array): void {
    this._gl.uniform4iv(shaderUniform.location, value);
  }

  uploadMat4(shaderUniform: ShaderUniform, value: Matrix4): void {
    this._gl.uniformMatrix4fv(shaderUniform.location, false, value.elements);
  }

  uploadMat4v(shaderUniform: ShaderUniform, value: Float32Array): void {
    this._gl.uniformMatrix4fv(shaderUniform.location, false, value);
  }

  uploadTexture(shaderUniform: ShaderUniform, value: Texture): void {
    // 开启第x号纹理单元
    this._gl.activeTexture(shaderUniform.textureIndex as GLenum);
    // 向target绑定纹理对象
    this._gl.bindTexture(value._glTarget, value._glTexture);
  }
}
