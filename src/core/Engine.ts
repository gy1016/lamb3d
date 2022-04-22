import { Canvas } from './Canvas';
import { Scene } from './Scene';

export class Engine {
  // one engine equal one canvas element
  canvas: Canvas;
  activeScene: Scene;

  constructor(canvasId: string) {
    this.canvas = new Canvas(canvasId);
    this.canvas.resizeByClientSize();
  }

  createScene() {
    const gl = this.canvas.gl;
    this.activeScene = new Scene(gl);
    this.activeScene.draw();
  }
}
