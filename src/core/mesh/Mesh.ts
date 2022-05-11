import { BufferUtil } from '../graphic/BufferUtil';
import { MeshTopology } from '../graphic/enums/MeshTopology';
import { IndexBufferBinding } from '../graphic/IndexBufferBinding';
import { VertexBufferBinding } from '../graphic/VertexBufferBinding';
import { VertexElement } from '../graphic/VertexElement';
import { ShaderProgram } from '../shader/ShaderProgram';

export class Mesh {
  name: string;

  _vertexElementMap: Record<string, VertexElement> = {};
  _glIndexType: number;
  _glIndexByteCount: number;

  _instanceCount: number = 0;
  _vertexBufferBindings: VertexBufferBinding[] = [];
  _indexBufferBinding: IndexBufferBinding = null;
  _vertexElements: VertexElement[] = [];

  private _positions: number[] = [];
  private _normals: number[] = [];
  private _uv: number[] = [];
  private _indices: Uint8Array | Uint16Array;

  constructor(name?: string) {
    this.name = name || '';
  }

  setPositions(positions: number[]): void {
    this._positions = positions;
  }

  getPostions(): number[] {
    return this._positions;
  }

  setNormals(normals: number[]): void {
    this._normals = normals;
  }

  getNormals(): number[] {
    return this._normals;
  }

  setUVs(uv: number[]): void {
    this._uv = uv;
  }

  getUVs(): number[] {
    return this._uv;
  }

  setIndices(indices: Uint8Array | Uint16Array): void {
    this._indices = indices;
  }

  getIndices(): Uint8Array | Uint16Array {
    return this._indices;
  }

  _clearVertexElements(): void {
    this._vertexElements.length = 0;
    const vertexElementMap = this._vertexElementMap;
    for (const k in vertexElementMap) {
      delete vertexElementMap[k];
    }
  }

  _addVertexElement(element: VertexElement): void {
    const { semantic } = element;
    this._vertexElementMap[semantic] = element;
    this._vertexElements.push(element);
  }

  protected _setVertexElements(elements: VertexElement[]): void {
    this._clearVertexElements();
    for (let i = 0, n = elements.length; i < n; i++) {
      this._addVertexElement(elements[i]);
    }
  }
}
