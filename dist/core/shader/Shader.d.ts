import { Engine } from '../Engine';
import { ShaderDataGroup } from './enums/ShaderDataGroup';
import { ShaderProgram } from './ShaderProgram';
import { ShaderProperty } from './ShaderProperty';
/**
 * Shader containing vertex and fragment source.
 */
export declare class Shader {
    /** Shader counter. */
    private static _shaderCounter;
    /** Shader map. */
    private static _shaderMap;
    /** Shader counter. */
    private static _propertyNameMap;
    /** The name of shader. */
    readonly name: string;
    /** @internal */
    _shaderId: number;
    /** Vertex shader source. */
    private _vertexSource;
    /** Fragment shader source. */
    private _fragmentSource;
    private constructor();
    /**
     * @internal
     */
    static _getShaderPropertyGroup(propertyName: string): ShaderDataGroup | null;
    /**
     * Get shader property by name.
     * @param name - Name of the shader property
     * @returns Shader property
     */
    static getPropertyByName(name: string): ShaderProperty;
    /**
     * Create a shader.
     * @param name - Name of the shader.
     * @param vertexSource - Vertex source code.
     * @param fragmentSource - Fragment source code.
     */
    static create(name: string, vertexSource: string, fragmentSource: string): Shader;
    /**
     * Find a shader by name.
     * @param name - Name of the shader
     */
    static find(name: string): Shader;
    /**
     * Create program based on shader.
     * @param engine
     * @returns Shader program.
     */
    _getShaderProgram(engine: Engine): ShaderProgram;
}
