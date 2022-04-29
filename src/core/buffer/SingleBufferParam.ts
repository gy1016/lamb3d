export class SingleBufferParam {
  id: WebGLBuffer;
  elementCount: number;
  type: number;
  // (x, y -> 2); (x, y, z -> 3)
  perVertexSize: number;
  normalize: boolean;
  stride: number;
  voffset: number;

  constructor(id: WebGLBuffer, elementCount: number, type: number, perVertexSize: number) {
    this.id = id;
    this.type = type;
    this.elementCount = elementCount;
    this.perVertexSize = perVertexSize;
    this.normalize = false;
    this.stride = 0;
    this.voffset = 0;
  }
}
