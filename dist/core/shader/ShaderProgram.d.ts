import { ShaderUniformBlock } from './ShaderUniformBlock';
import { ShaderData } from './ShaderData';
import { Engine } from '../Engine';
/**
 * Shader program, corresponding to the GPU shader program.
 */
export declare class ShaderProgram {
    /** Shader program counter. */
    private static _counter;
    /** Shader program id. */
    id: number;
    readonly sceneUniformBlock: ShaderUniformBlock;
    readonly cameraUniformBlock: ShaderUniformBlock;
    readonly rendererUniformBlock: ShaderUniformBlock;
    readonly materialUniformBlock: ShaderUniformBlock;
    readonly otherUniformBlock: ShaderUniformBlock;
    /** Attribute variable location in webgl. */
    attributeLocation: Record<string, GLint>;
    private _isValid;
    private _engine;
    private _gl;
    private _vertexShader;
    private _fragmentShader;
    private _glProgram;
    /** Currently active texture unit. */
    private _activeTextureUint;
    /** WebGL program. */
    get glProgram(): WebGLProgram;
    /**
     * Whether this shader program is valid.
     */
    get isValid(): boolean;
    constructor(engine: Engine, vertexSource: string, fragmentSource: string);
    /**
     * Create a webgl program instance.
     * @param vertexSource Vertex source code.
     * @param fragmentSource Fragment source code.
     * @returns WebGL program.
     */
    private _createProgram;
    /**
     * Create and compile shader.
     * @param shaderType Fragment shader code or vertex shader code.
     * @param shaderSource Fragment shader source code or vertex shader source code.
     * @returns WebGLShader | null
     */
    private _createShader;
    /**
     * Push texture data or uniform data into the block of the corresponding group.
     * @param uniform Shader uniform.
     * @param group Shader data group: Scene, Camera, Renderer and Material.
     * @param isTexture Is it a texture or a uniform variable.
     */
    private _groupingUniform;
    /**
     * Record the location of uniform/attribute.
     */
    private _recordLocation;
    /**
     * Get the address of the active uniform variable in the current webgl program.
     * @returns Array of uniform variable addresses.
     */
    private _getUniformInfos;
    /**
     * Get the address of the active attribute variable in the current webgl program.
     * @returns Array of attribute variable addresses.
     */
    private _getAttributeInfos;
    /**
     * Upload all shader data in shader uniform block.
     * @param uniformBlock - shader Uniform block
     * @param shaderData - shader data
     */
    uploadAll(uniformBlock: ShaderUniformBlock, shaderData: ShaderData): void;
    /**
     * Upload constant shader data in shader uniform block.
     * @param uniformBlock - shader Uniform block
     * @param shaderData - shader data
     */
    uploadUniforms(uniformBlock: ShaderUniformBlock, shaderData: ShaderData): void;
    /**
     * Upload texture shader data in shader uniform block.
     * @param uniformBlock - shader Uniform block
     * @param shaderData - shader data
     */
    uploadTextures(uniformBlock: ShaderUniformBlock, shaderData: ShaderData): void;
    /**
     * Bind this shader program.
     * @returns Whether the shader program is switched.
     */
    bind(): boolean;
    destroy(): void;
}
