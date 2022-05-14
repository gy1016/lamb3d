import { Matrix4, Vector2, Vector3, Vector4 } from '../../math';
import { ShaderPropertyValueType } from './ShaderData';

export class ShaderUniform {
  name: string;
  propertyId: number;
  location: WebGLUniformLocation;
  applyFunc: (shaderUniform: ShaderUniform, value: ShaderPropertyValueType) => void;

  private _gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
  }

  uploadMat4(shaderUniform: ShaderUniform, value: Matrix4): void {
    this._gl.uniformMatrix4fv(shaderUniform.location, false, value.elements);
  }

  uploadMat4v(shaderUniform: ShaderUniform, value: Float32Array): void {
    this._gl.uniformMatrix4fv(shaderUniform.location, false, value);
  }
}
