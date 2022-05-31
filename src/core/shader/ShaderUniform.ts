import { Matrix4, Vector2, Vector3, Vector4 } from '../../math';
import { ShaderPropertyValueType } from './ShaderData';

export class ShaderUniform {
  name: string;
  propertyId: number;
  location: WebGLUniformLocation;
  applyFunc: (shaderUniform: ShaderUniform, value: ShaderPropertyValueType) => void;
  cacheValue: number | Vector2 | Vector3 | Vector4;

  private _gl: WebGLRenderingContext;

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
}
