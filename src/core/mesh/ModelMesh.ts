import { Vector3, Vector2 } from '@/math';
import { Mesh, IndexFormat, VertexElement, VertexElementFormat } from '../graphic';

export class ModelMesh extends Mesh {
  private _indices: Uint8Array | Uint16Array | Uint32Array | null = null;

  private _positions: Vector3[] = [];
  private _normals: Vector3[] | null = [];
  private _uv: Vector2[] | null = [];

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
  uploadData(): void {}
}
