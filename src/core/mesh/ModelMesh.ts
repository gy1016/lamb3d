import { Vector3, Vector2 } from '@/math';
import { Mesh, IndexFormat } from '../graphic';

export class ModelMesh extends Mesh {
  private _vertexCount: number = 0;
  private _accessible: boolean = true;
  private _verticesFloat32: Float32Array | null = null;
  private _verticesUint8: Uint8Array | null = null;
  private _indices: Uint8Array | Uint16Array | Uint32Array | null = null;
  private _indicesFormat: IndexFormat = null;
  private _vertexSlotChanged: boolean = true;
  private _vertexChangeFlag: number = 0;
  private _indicesChangeFlag: boolean = false;
  private _elementCount: number = 0;
  private _lastUploadVertexCount: number = -1;

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

  constructor(name?: string) {
    super();
    this.name = name;
  }

  setPositions(positions: Vector3[]): void {
    this._positions = positions;
  }

  getPostions(): Vector3[] {
    return this._positions;
  }

  setNormals(normals: Vector3[]): void {
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

  setIndices(indices: Uint8Array | Uint16Array | Uint32Array): void {
    this._indices = indices;
  }

  getIndices(): Uint8Array | Uint16Array | Uint32Array {
    return this._indices;
  }

  /**
   * Upload Mesh Data to the graphics API.
   * @param noLongerAccessible - Whether to access data later. If true, you'll never access data anymore (free memory cache)
   */
  uploadData(noLongerAccessible: boolean): void {
    if (!this._accessible) {
      throw 'Not allowed to access data while accessible is false.';
    }
  }

  private _updateVertices(vertices: Float32Array, blendVerticesUpdate: boolean, force: boolean): void {
    // prettier-ignore
    const { _elementCount,_vertexCount, _positions, _normals, _vertexChangeFlag,  _uv} = this;

    force && (this._vertexChangeFlag = ValueChanged.All);

    if (_vertexChangeFlag & ValueChanged.Position) {
      for (let i = 0; i < _vertexCount; i++) {
        const start = _elementCount * i;
        const position = _positions[i];
        vertices[start] = position.x;
        vertices[start + 1] = position.y;
        vertices[start + 2] = position.z;
      }
    }

    let offset = 3;

    if (_normals) {
      if (_vertexChangeFlag & ValueChanged.Normal) {
        for (let i = 0; i < _vertexCount; i++) {
          const start = _elementCount * i + offset;
          const normal = _normals[i];
          if (normal) {
            vertices[start] = normal.x;
            vertices[start + 1] = normal.y;
            vertices[start + 2] = normal.z;
          }
        }
      }
      offset += 3;
    }
    this._vertexChangeFlag = 0;
  }
}

enum ValueChanged {
  Position = 0x1,
  Normal = 0x2,
  Color = 0x4,
  Tangent = 0x8,
  BoneWeight = 0x10,
  BoneIndex = 0x20,
  UV = 0x40,
  UV1 = 0x80,
  UV2 = 0x100,
  UV3 = 0x200,
  UV4 = 0x400,
  UV5 = 0x800,
  UV6 = 0x1000,
  UV7 = 0x2000,
  All = 0xffff,
}
