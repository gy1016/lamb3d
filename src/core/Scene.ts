import { Camera } from './Camera';
import { Canvas } from './Canvas';
import { Entity } from './Entity';
import { Renderer } from './Renderer';

export class Scene {
  gl: WebGLRenderingContext;
  canvas: Canvas;
  entities: Entity[];
  camera: Camera;
  // params: any;

  /**
   * constructor
   * @param canvasId : getElementById
   * @param params : scene params
   */
  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId);
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = new Canvas(canvas);
      this.canvas.resizeByClientSize();
    } else {
      throw `canvas is not a HTMLCanvasElement!`;
    }
    const gl = canvas.getContext('webgl', {});
    this.gl = gl;
    this.entities = [];
  }

  /**
   * ClearColor, clearDepth, enable depth_test, clear color buffer bit and depth buffer bit
   * @param gl WebGLRenderingContext
   * @param rgba Scene background color
   */
  initRenderState(gl: WebGLRenderingContext, rgba: [number, number, number, number]) {
    gl.clearColor(rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  addEntity(entity: Entity) {
    if (entity instanceof Entity) {
      if (this.entities == null) {
        this.entities = [];
      }
      this.entities.push(entity);
    }
  }

  run() {
    const gl = this.gl;
    const entities = this.entities;
    const camera = this.camera;
    camera && camera.render();
    entities.forEach((entity) => {
      const { mesh, material } = entity;
      const program = material.shader._getShaderProgram(gl);
      program.uploadAll(program.cameraUniformBlock, camera.shaderData);
      mesh._draw(program, mesh.subMesh);
    });
  }
}
