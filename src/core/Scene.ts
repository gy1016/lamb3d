export class Scene {
  cameraList: any;
  entityList: any;
  clearColor: [number, number, number, number];
  gl: WebGLRenderingContext;

  constructor() {
    this.cameraList = [];
    this.entityList = [];
    this.clearColor = [0.3, 0.2, 0.2, 1.0];
  }
}
