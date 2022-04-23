export class Mesh {
  name: string;

  private _positions: number[] = [];
  private _normals: number[] = [];
  private _uv: number[] = [];
  private _indices: Uint8Array | Uint16Array;

  constructor(name?: string) {
    this.name = name || '';
  }

  setPositions(positions: number[]): void {
    const count = positions.length;
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
}
