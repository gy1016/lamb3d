import { Vector3, Vector2 } from '@/math';
import {
  Mesh,
  IndexFormat,
  VertexElement,
  VertexElementFormat,
  Buffer,
  BufferBindFlag,
  BufferUsage,
  VertexBufferBinding,
  IndexBufferBinding,
} from '../graphic';

export class ModelMesh extends Mesh {
  private gl: WebGLRenderingContext;
  private _vertexCount: number = 0;
  private _accessible: boolean = true;
  private _verticesFloat32: Float32Array | null = null;
  private _verticesUint8: Uint8Array | null = null;
  // 就是一个顶点几个元素，xyz就是3个
  private _elementCount: number = 0;
  private _lastUploadVertexCount: number = -1;
  private _indicesFormat: IndexFormat = null;
  private _indices: Uint8Array | Uint16Array | Uint32Array | null = null;
  private _positions: Vector3[] = [];
  private _normals: Vector3[] | null = [];
  private _uv: Vector2[] | null = [];

  /**
   * Whether to access data of the mesh.
   */
  get accessible(): boolean {
    return this._accessible;
  }

  /**
   * Vertex count of current mesh.
   */
  get vertexCount(): number {
    return this._vertexCount;
  }

  constructor(gl: WebGLRenderingContext, name?: string) {
    super();
    this.gl = gl;
    this.name = name;
  }

  setPositions(positions: Vector3[]): void {
    if (!this._accessible) {
      throw 'Not allowed to access data while accessible is false.';
    }
    this._positions = positions;
    this._vertexCount = positions.length;
  }

  getPostions(): Vector3[] {
    return this._positions;
  }

  setNormals(normals: Vector3[]): void {
    if (!this._accessible) {
      throw 'Not allowed to access data while accessible is false.';
    }

    if (normals.length !== this._vertexCount) {
      throw 'The array provided needs to be the same size as vertex count.';
    }

    this._normals = normals;
  }

  getNormals(): Vector3[] {
    return this._normals;
  }

  setUVs(uv: Vector2[]): void {
    this._uv = uv;
  }

  getUVs(): Vector2[] {
    return this._uv;
  }

  /**
   * Set indices for the mesh.
   * @param indices - The indices for the mesh.
   */
  setIndices(indices: Uint8Array | Uint16Array | Uint32Array): void {
    if (!this._accessible) {
      throw 'Not allowed to access data while accessible is false.';
    }

    if (this._indices !== indices) {
      this._indices = indices;
      if (indices instanceof Uint8Array) {
        this._indicesFormat = IndexFormat.UInt8;
      } else if (indices instanceof Uint16Array) {
        this._indicesFormat = IndexFormat.UInt16;
      } else if (indices instanceof Uint32Array) {
        this._indicesFormat = IndexFormat.UInt32;
      }
    }
  }

  /**
   * Get indices for the mesh.
   */
  getIndices(): Uint8Array | Uint16Array | Uint32Array {
    if (!this._accessible) {
      throw 'Not allowed to access data while accessible is false.';
    }
    return this._indices;
  }

  /**
   * Upload Mesh Data to the graphics API.
   * @param noLongerAccessible - Whether to access data later. If true, you'll never access data anymore (free memory cache)
   */
  uploadData(): void {
    if (!this._accessible) {
      throw 'Not allowed to access data while accessible is false.';
    }

    this._updateVertexElements();
    const gl = this.gl;
    const { _vertexCount: vertexCount } = this;
    const vertexCountChange = this._lastUploadVertexCount !== vertexCount;

    const vertexBuffer = this._vertexBufferBindings[0]?._buffer;
    if (vertexCountChange) {
      const elementCount = this._elementCount;
      const vertexFloatCount = elementCount * vertexCount;
      const vertices = new Float32Array(vertexFloatCount);
      this._verticesFloat32 = vertices;
      this._verticesUint8 = new Uint8Array(vertices.buffer);
      this._updateVertices(vertices);

      const newVertexBuffer = new Buffer(gl, BufferBindFlag.VertexBuffer, vertices, BufferUsage.Static);

      this._setVertexBufferBinding(0, new VertexBufferBinding(newVertexBuffer, elementCount * 4));
      this._lastUploadVertexCount = vertexCount;
    } else {
      const vertices = this._verticesFloat32;
      this._updateVertices(vertices);
      vertexBuffer.setData(vertices);
    }

    const { _indices } = this;
    const indexBuffer = this._indexBufferBinding?._buffer;
    if (_indices) {
      if (!indexBuffer || _indices.byteLength != indexBuffer.byteLength) {
        const newIndexBuffer = new Buffer(gl, BufferBindFlag.IndexBuffer, _indices);
        this._setIndexBufferBinding(new IndexBufferBinding(newIndexBuffer, this._indicesFormat));
      }
    } else if (indexBuffer) {
      this._setIndexBufferBinding(null);
    }
  }

  private _updateVertexElements(): void {
    this._clearVertexElements();
    this._addVertexElement(POSITION_VERTEX_ELEMENT);

    let offset = 12;
    let elementCount = 3;
    if (this._normals) {
      this._addVertexElement(new VertexElement('NORMAL', offset, VertexElementFormat.Vector3, 0));
      offset += 12;
      elementCount += 3;
    }

    this._elementCount = elementCount;
  }

  private _updateVertices(vertices: Float32Array): void {
    const { _elementCount, _vertexCount, _positions, _normals } = this;

    for (let i = 0; i < _vertexCount; i++) {
      const start = _elementCount * i;
      const position = _positions[i];
      vertices[start] = position.x;
      vertices[start + 1] = position.y;
      vertices[start + 2] = position.z;
    }
  }
}

const POSITION_VERTEX_ELEMENT = new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0);
