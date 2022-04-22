export class Scene {
  cameraList: any;
  entityList: any;
  clearColor: [number, number, number, number];
  gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext) {
    this.cameraList = [];
    this.entityList = [];
    this.clearColor = [0.3, 0.2, 0.2, 1.0];
    this.gl = gl;
  }

  initRenderState() {
    const gl = this.gl;
    gl.clearColor(...this.clearColor);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  draw() {
    this.initRenderState();
  }
}
