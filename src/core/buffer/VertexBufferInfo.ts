import { SingleBufferParam } from './SingleBufferParam';

export class VertexBufferInfo {
  vertexPos: SingleBufferParam;
  vertexColor: SingleBufferParam;
  vertexIndices: SingleBufferParam;
  vertexCount: number;
  primitiveType: number;

  constructor() {
    this.vertexPos = null;
    this.vertexColor = null;
    this.vertexIndices = null;
    this.vertexCount = -1;
    this.primitiveType = null;
  }
}
