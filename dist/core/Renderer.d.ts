import { ShaderProgram } from './shader/ShaderProgram';
import { Mesh, SubMesh } from './graphic';
/**
 * Renderer, each Mesh will have a renderer instance.
 */
export declare class Renderer {
    /** Current bind program. */
    static glProgram: ShaderProgram;
    private gl;
    /** Array of addresses of attribute variables in shader programs. */
    protected attribLocArray: number[];
    /** Mesh to be rendered. */
    protected readonly _primitive: Mesh;
    /**
     * Render based on rendering context and grid.
     * @param gl WebGL rendering context.
     * @param primitive Mesh to be rendered.
     */
    constructor(gl: WebGLRenderingContext, primitive: Mesh);
    /**
     * Bind buffer and attribute.
     */
    protected bindBufferAndAttrib(shaderProgram: ShaderProgram): void;
    /**
     * Clear depth, color buffer, etc.
     */
    initRenderState(): void;
    /**
     * Draw the primitive.
     */
    draw(shaderProgram: ShaderProgram, subMesh: SubMesh): void;
}
