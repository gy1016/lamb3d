import { Matrix4, Vector2, Vector3, Vector4, Color } from '../../math';
import { Texture } from '../texture';
import { ShaderPropertyValueType } from './ShaderData';
/**
 * The encapsulation of each uniform variable, including its cache value, data upload method, and data storage address.
 */
export declare class ShaderUniform {
    name: string;
    propertyId: number;
    location: WebGLUniformLocation;
    applyFunc: (shaderUniform: ShaderUniform, value: ShaderPropertyValueType) => void;
    cacheValue: number | Vector2 | Vector3 | Vector4;
    textureIndex: GLenum | GLenum[];
    textureDefault: Texture | Texture[];
    private _gl;
    private _colorSpace;
    constructor(gl: WebGLRenderingContext);
    upload1f(shaderUniform: ShaderUniform, value: number): void;
    upload1fv(shaderUniform: ShaderUniform, value: Float32Array): void;
    upload2fv(shaderUniform: ShaderUniform, value: Float32Array): void;
    upload3f(shaderUniform: ShaderUniform, value: Vector3 | Vector4 | Color): void;
    upload3fv(shaderUniform: ShaderUniform, value: Float32Array): void;
    upload4fv(shaderUniform: ShaderUniform, value: Float32Array): void;
    upload1i(shaderUniform: ShaderUniform, value: number): void;
    upload1iv(shaderUniform: ShaderUniform, value: Int32Array): void;
    upload2iv(shaderUniform: ShaderUniform, value: Int32Array): void;
    upload3iv(shaderUniform: ShaderUniform, value: Int32Array): void;
    upload4iv(shaderUniform: ShaderUniform, value: Int32Array): void;
    uploadMat4(shaderUniform: ShaderUniform, value: Matrix4): void;
    uploadMat4v(shaderUniform: ShaderUniform, value: Float32Array): void;
    uploadTexture(shaderUniform: ShaderUniform, value: Texture): void;
}
