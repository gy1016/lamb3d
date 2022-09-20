import { Color, Matrix4, Vector2, Vector3, Vector4 } from '../../math';
import { Texture } from '../texture';
import { ShaderDataGroup } from './enums/ShaderDataGroup';
import { ShaderProperty } from './ShaderProperty';
export declare type ShaderPropertyValueType = number | Vector2 | Vector3 | Vector4 | Color | Matrix4 | Texture | Texture[] | Int32Array | Float32Array;
export declare class ShaderData {
    _group: ShaderDataGroup;
    _properties: Record<number, ShaderPropertyValueType>;
    constructor(group: ShaderDataGroup);
    /**
     * Get float by shader property name.
     * @param propertyName - Shader property name
     * @returns Float
     */
    getFloat(propertyName: string): number;
    /**
     * Get float by shader property.
     * @param property - Shader property
     * @returns Float
     */
    getFloat(property: ShaderProperty): number;
    /**
     * Set float by shader property name.
     * @remarks Corresponding float shader property type.
     * @param propertyName - Shader property name
     * @param value - Float
     */
    setFloat(propertyName: string, value: number): void;
    /**
     * Set float by shader property.
     * @remarks Corresponding float shader property type.
     * @param property - Shader property
     * @param value - Float
     */
    setFloat(property: ShaderProperty, value: number): void;
    /**
     * Get int by shader property name.
     * @param propertyName - Shader property name
     * @returns Int
     */
    getInt(propertyName: string): number;
    /**
     * Get int by shader property.
     * @param property - Shader property
     * @returns Int
     */
    getInt(property: ShaderProperty): number;
    /**
     * Set int by shader property name.
     * @remarks Correspondence includes int and bool shader property type.
     * @param propertyName - Shader property name
     * @param value - Int
     */
    setInt(propertyName: string, value: number): void;
    /**
     * Set int by shader property.
     * @remarks Correspondence includes int and bool shader property type.
     * @param property - Shader property
     * @param value - Int
     */
    setInt(property: ShaderProperty, value: number): void;
    /**
     * Get float array by shader property name.
     * @param propertyName - Shader property name
     * @returns Float array
     */
    getFloatArray(propertyName: string): Float32Array;
    /**
     * Get float array by shader property.
     * @param property - Shader property
     * @returns Float array
     */
    getFloatArray(property: ShaderProperty): Float32Array;
    /**
     * Set float array by shader property name.
     * @remarks Correspondence includes float array、vec2 array、vec3 array、vec4 array and matrix array shader property type.
     * @param propertyName - Shader property name
     * @param value - Float array
     */
    setFloatArray(propertyName: string, value: Float32Array): void;
    /**
     * Set float array by shader property.
     * @remarks Correspondence includes float array、vec2 array、vec3 array、vec4 array and matrix array shader property type.
     * @param property - Shader property
     * @param value - Float array
     */
    setFloatArray(property: ShaderProperty, value: Float32Array): void;
    /**
     * Get int array by shader property name.
     * @param propertyName - Shader property name
     * @returns Int Array
     */
    getIntArray(propertyName: string): Int32Array;
    /**
     * Get int array by shader property.
     * @param property - Shader property
     * @returns Int Array
     */
    getIntArray(property: ShaderProperty): Int32Array;
    /**
     * Set int array by shader property name.
     * @remarks Correspondence includes bool array、int array、bvec2 array、bvec3 array、bvec4 array、ivec2 array、ivec3 array and ivec4 array shader property type.
     * @param propertyName - Shader property name
     * @param value - Int Array
     */
    setIntArray(propertyName: string, value: Int32Array): void;
    /**
     * Set int array by shader property.
     * @remarks Correspondence includes bool array、int array、bvec2 array、bvec3 array、bvec4 array、ivec2 array、ivec3 array and ivec4 array shader property type.
     * @param property - Shader property
     * @param value - Int Array
     */
    setIntArray(property: ShaderProperty, value: Int32Array): void;
    /**
     * Get two-dimensional from shader property name.
     * @param propertyName - Shader property name
     * @returns Two-dimensional vector
     */
    getVector2(propertyName: string): Vector2;
    /**
     * Get two-dimensional from shader property.
     * @param property - Shader property
     * @returns Two-dimensional vector
     */
    getVector2(property: ShaderProperty): Vector2;
    /**
     * Set two-dimensional vector from shader property name.
     * @remarks Correspondence includes vec2、ivec2 and bvec2 shader property type.
     * @param property - Shader property name
     * @param value - Two-dimensional vector
     */
    setVector2(property: string, value: Vector2): void;
    /**
     * Set two-dimensional vector from shader property.
     * @remarks Correspondence includes vec2、ivec2 and bvec2 shader property type.
     * @param property - Shader property
     * @param value - Two-dimensional vector
     */
    setVector2(property: ShaderProperty, value: Vector2): void;
    /**
     * Get vector3 by shader property name.
     * @param propertyName - Shader property name
     * @returns Three-dimensional vector
     */
    getVector3(propertyName: string): Vector3;
    /**
     * Get vector3 by shader property.
     * @param property - Shader property
     * @returns Three-dimensional vector
     */
    getVector3(property: ShaderProperty): Vector3;
    /**
     * Set three dimensional vector by shader property name.
     * @remarks Correspondence includes vec3、ivec3 and bvec3 shader property type.
     * @param property - Shader property name
     * @param value - Three-dimensional vector
     */
    setVector3(property: string, value: Vector3): void;
    /**
     * Set three dimensional vector by shader property.
     * @remarks Correspondence includes vec3、ivec3 and bvec3 shader property type.
     * @param property - Shader property
     * @param value - Three-dimensional vector
     */
    setVector3(property: ShaderProperty, value: Vector3): void;
    /**
     * Get vector4 by shader property name.
     * @param propertyName - Shader property name
     * @returns Four-dimensional vector
     */
    getVector4(propertyName: string): Vector4;
    /**
     * Get vector4 by shader property.
     * @param property - Shader property
     * @returns Four-dimensional vector
     */
    getVector4(property: ShaderProperty): Vector4;
    /**
     * Set four-dimensional vector by shader property name.
     * @remarks Correspondence includes vec4、ivec4 and bvec4 shader property type.
     * @param property - Shader property name
     * @param value - Four-dimensional vector
     */
    setVector4(property: string, value: Vector4): void;
    /**
     * Set four-dimensional vector by shader property.
     * @remarks Correspondence includes vec4、ivec4 and bvec4 shader property type.
     * @param property - Shader property
     * @param value - Four-dimensional vector
     */
    setVector4(property: ShaderProperty, value: Vector4): void;
    /**
     * Get matrix by shader property name.
     * @param propertyName - Shader property name
     * @returns Matrix
     */
    getMatrix(propertyName: string): Matrix4;
    /**
     * Get matrix by shader property.
     * @param property - Shader property
     * @returns Matrix
     */
    getMatrix(property: ShaderProperty): Matrix4;
    /**
     * Set matrix by shader property name.
     * @remarks Correspondence includes matrix shader property type.
     * @param propertyName - Shader property name
     * @param value - Matrix
     */
    setMatrix(propertyName: string, value: Matrix4): any;
    /**
     * Set matrix by shader property.
     * @remarks Correspondence includes matrix shader property type.
     * @param property - Shader property
     * @param value - Matrix
     */
    setMatrix(property: ShaderProperty, value: Matrix4): any;
    _getData<T extends ShaderPropertyValueType>(property: string | ShaderProperty): T;
    /**
     * Get texture by shader property name.
     * @param propertyName - Shader property name
     * @returns Texture
     */
    getTexture(propertyName: string): Texture;
    /**
     * Get texture by shader property.
     * @param property - Shader property
     * @returns Texture
     */
    getTexture(property: ShaderProperty): Texture;
    /**
     * Set texture by shader property name.
     * @param propertyName - Shader property name
     * @param value - Texture
     */
    setTexture(propertyName: string, value: Texture): void;
    /**
     * Set texture by shader property.
     * @param property - Shader property
     * @param value - Texture
     */
    setTexture(property: ShaderProperty, value: Texture): void;
    /**
     * Get color by shader property name.
     * @param propertyName - Shader property name
     * @returns Color
     */
    getColor(propertyName: string): Color;
    /**
     * Get color by shader property.
     * @param property - Shader property
     * @returns Color
     */
    getColor(property: ShaderProperty): Color;
    /**
     * Set color by shader property name.
     * @remarks Correspondence includes vec4 shader property type.
     * @param propertyName - Shader property name
     * @param value - Color
     */
    setColor(propertyName: string, value: Color): void;
    /**
     * Set color by shader property.
     * @remarks Correspondence includes vec4 shader property type.
     * @param property - Shader property
     * @param value - Color
     */
    setColor(property: ShaderProperty, value: Color): void;
    _setData<T extends ShaderPropertyValueType>(property: string | ShaderProperty, value: T): void;
}
