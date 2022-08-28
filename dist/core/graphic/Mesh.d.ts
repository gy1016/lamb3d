import { IndexBufferBinding } from '../graphic/IndexBufferBinding';
import { VertexBufferBinding } from '../graphic/VertexBufferBinding';
import { VertexElement } from '../graphic/VertexElement';
import { SubMesh } from '../graphic/SubMesh';
import { ShaderProgram } from '../shader/ShaderProgram';
import { Renderer } from '../Renderer';
import { MeshTopology } from './enums/MeshTopology';
/**
 * Grid abstract class.
 */
export declare abstract class Mesh {
    /** Name. */
    name: string;
    /** Vertex entity record table, used for caching. */
    _vertexElementMap: Record<string, VertexElement>;
    /** The storage type of the index, for example: UInt8. */
    _glIndexType: number;
    /** Each index occupies several bytes, 8 bits per byte. */
    _glIndexByteCount: number;
    /** A platform that provides rendering capabilities. */
    _platformPrimitive: Renderer;
    /** A Mesh may consist of multiple vertex instances. */
    _instanceCount: number;
    /** The vertex buffer corresponding to the mesh. */
    _vertexBufferBindings: VertexBufferBinding[];
    /** The index buffer corresponding to the mesh */
    _indexBufferBinding: IndexBufferBinding;
    /** Array of vertex elements. */
    _vertexElements: VertexElement[];
    protected gl: WebGLRenderingContext;
    /** Drawing information for each element. */
    private _subMeshes;
    /**
     * First sub-mesh. Rendered using the first material.
     */
    get subMesh(): SubMesh | null;
    /**
     * A collection of sub-mesh, each sub-mesh can be rendered with an independent material.
     */
    get subMeshes(): Readonly<SubMesh[]>;
    /**
     * Add sub-mesh, each sub-mesh can correspond to an independent material.
     * @param subMesh - Start drawing offset, if the index buffer is set, it means the offset in the index buffer, if not set, it means the offset in the vertex buffer
     * @returns Sub-mesh
     */
    addSubMesh(subMesh: SubMesh): SubMesh;
    /**
     * Add sub-mesh, each sub-mesh can correspond to an independent material.
     * @param start - Start drawing offset, if the index buffer is set, it means the offset in the index buffer, if not set, it means the offset in the vertex buffer
     * @param count - Drawing count, if the index buffer is set, it means the count in the index buffer, if not set, it means the count in the vertex buffer
     * @param topology - Drawing topology, default is MeshTopology.Triangles
     * @returns Sub-mesh
     */
    addSubMesh(start: number, count: number, topology?: MeshTopology): SubMesh;
    /**
     * Remove sub-mesh.
     * @param subMesh - Sub-mesh needs to be removed
     */
    removeSubMesh(subMesh: SubMesh): void;
    /**
     * Clear all sub-mesh.
     */
    clearSubMesh(): void;
    constructor(gl: WebGLRenderingContext, name?: string);
    _clearVertexElements(): void;
    _addVertexElement(element: VertexElement): void;
    _draw(shaderProgram: ShaderProgram, subMesh: SubMesh): void;
    _onDestroy(): void;
    protected _setVertexElements(elements: VertexElement[]): void;
    protected _setVertexBufferBinding(index: number, binding: VertexBufferBinding): void;
    protected _setIndexBufferBinding(binding: IndexBufferBinding | null): void;
}
