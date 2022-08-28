import { Vector3, Vector2 } from '@/math';
import { Mesh } from '../graphic';
/**
 * Create a model from an array of information such as vertices, indices, normal vectors, etc.
 */
export declare class ModelMesh extends Mesh {
    /** The number of vertices in the model. */
    private _vertexCount;
    /** Availability of the model. */
    private _accessible;
    private _verticesFloat32;
    private _verticesUint8;
    /** A vertex has several elements, xyz is 3. */
    private _elementCount;
    private _lastUploadVertexCount;
    /** Index format. */
    private _indicesFormat;
    /** Index type array. */
    private _indices;
    /** Array of vertex positions. */
    private _positions;
    /** Array of normal vectors. */
    private _normals;
    /** Array of texture coordinates */
    private _uv;
    /**
     * Whether to access data of the mesh.
     */
    get accessible(): boolean;
    /**
     * Vertex count of current mesh.
     */
    get vertexCount(): number;
    constructor(gl: WebGLRenderingContext, name?: string);
    /**
     * Set the vertex position information of the model.
     * @param positions Array of model vertex coordinates.
     */
    setPositions(positions: Vector3[]): void;
    /**
     * Get the vertex position information of the model.
     * @returns Array of model vertex coordinates.
     */
    getPostions(): Vector3[];
    /**
     * Set model normal vector.
     * @param normals Array of normal vectors.
     */
    setNormals(normals: Vector3[]): void;
    /**
     * Get model normal vector.
     * @returns Array of normal vectors.
     */
    getNormals(): Vector3[];
    /**
     * Set texture coordinates.
     * @param uv Texture coordinates.
     */
    setUVs(uv: Vector2[]): void;
    /**
     * Get texture coordinates.
     * @returns Texture coordinates.
     */
    getUVs(): Vector2[];
    /**
     * Set indices for the mesh.
     * @param indices - The indices for the mesh.
     */
    setIndices(indices: Uint8Array | Uint16Array | Uint32Array): void;
    /**
     * Get indices for the mesh.
     */
    getIndices(): Uint8Array | Uint16Array | Uint32Array;
    /**
     * Upload Mesh Data to the graphics API.
     */
    uploadData(noLongerAccessible?: boolean): void;
    /**
     * Vertex elements are composed of vertex coordinates, texture coordinates, normal vectors and other information.
     */
    private _updateVertexElements;
    /**
     * Fill the void Float32Array with postion, normal and uvs.
     * @param vertices void Float32Array
     */
    private _updateVertices;
}
