import { ProgramInfo } from '../program/ProgramInfo';
import { VertexBufferInfo } from '../buffer/VertexBufferInfo';

export class RenderInfo {
  gl: WebGLRenderingContext;
  programInfo: ProgramInfo;
  vertexBuffer: VertexBufferInfo;

  constructor(gl: WebGLRenderingContext, programInfo: ProgramInfo, vertexBuffer: VertexBufferInfo) {
    this.gl = gl;
    this.programInfo = programInfo;
    this.vertexBuffer = vertexBuffer;
  }
}
