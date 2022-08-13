import { Vector3, Vector2 } from '@lamb3d/math';
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
  private _normals: Vector3[] | null = null;
  private _uv: Vector2[] | null = null;

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
    super(gl);
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
   */
  uploadData(noLongerAccessible: boolean = true): void {
    if (!this._accessible) {
      throw 'Not allowed to access data while accessible is false.';
    }

    this._updateVertexElements();
    const gl = this.gl;
    // positions的Vector3的个数
    const { _vertexCount: vertexCount } = this;
    const vertexCountChange = this._lastUploadVertexCount !== vertexCount;

    const vertexBuffer = this._vertexBufferBindings[0]?._buffer;
    if (vertexCountChange) {
      // 一组数据有多少个元素，比如：顶点(3) + 法向量(3) + 纹理(2) = 8
      const elementCount = this._elementCount;
      // Float32Array数组该给多少空间
      const vertexFloatCount = elementCount * vertexCount;
      const vertices = new Float32Array(vertexFloatCount);
      this._verticesFloat32 = vertices;
      // 这个东西有什么用实在搞不明白？
      this._verticesUint8 = new Uint8Array(vertices.buffer);
      this._updateVertices(vertices);

      const newVertexBuffer = new Buffer(
        gl,
        BufferBindFlag.VertexBuffer,
        vertices,
        noLongerAccessible ? BufferUsage.Static : BufferUsage.Dynamic,
      );
      // 因为是Float32Array，32位，4个字节，故stride为elementCount * 4
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
    // 因为顶点元素是必须有的！
    this._addVertexElement(POSITION_VERTEX_ELEMENT);

    let offset = 12;
    let elementCount = 3;
    if (this._normals) {
      this._addVertexElement(new VertexElement('NORMAL', offset, VertexElementFormat.Vector3, 0));
      offset += 12;
      elementCount += 3;
    }
    if (this._uv) {
      this._addVertexElement(new VertexElement('TEXCOORD_0', offset, VertexElementFormat.Vector2, 0));
      offset += 8;
      elementCount += 2;
    }

    this._elementCount = elementCount;
  }

  /**
   * Fill the void Float32Array with postion, normal and uvs.
   * @param vertices void Float32Array
   */
  private _updateVertices(vertices: Float32Array): void {
    const { _elementCount, _vertexCount, _positions, _normals, _uv } = this;

    for (let i = 0; i < _vertexCount; i++) {
      const start = _elementCount * i;
      const position = _positions[i];
      vertices[start] = position.x;
      vertices[start + 1] = position.y;
      vertices[start + 2] = position.z;
    }

    let offset = 3;

    if (_normals) {
      for (let i = 0; i < _vertexCount; i++) {
        const start = _elementCount * i + offset;
        const normal = _normals[i];
        if (normal) {
          vertices[start] = normal.x;
          vertices[start + 1] = normal.y;
          vertices[start + 2] = normal.z;
        }
      }
      offset += 3;
    }

    if (_uv) {
      for (let i = 0; i < _vertexCount; i++) {
        const start = _elementCount * i + offset;
        const uv = _uv[i];
        if (uv) {
          vertices[start] = uv.x;
          vertices[start + 1] = uv.y;
        }
      }
      offset += 2;
    }
  }
}

const POSITION_VERTEX_ELEMENT = new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0);
