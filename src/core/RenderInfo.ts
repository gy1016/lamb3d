export class RenderInfo {
  gl: WebGLRenderingContext;
  projectionMatrix: any;
  modelViewMatrix: any;
  programInfo: any;
  vertexBuffer: any;

  constructor(
    gl: WebGLRenderingContext,
    projM: any,
    mvM: any,
    programInfo: any,
    vertexBuffer: any,
  ) {
    this.gl = gl;
    this.projectionMatrix = projM;
    this.modelViewMatrix = mvM;
    this.programInfo = programInfo;
    this.vertexBuffer = vertexBuffer;
  }
}
