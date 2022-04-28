import { Canvas } from './Canvas';

export class Scene {
  gl: any;
  canvas: Canvas;
  params: any;

  constructor(canvasId: string, params: any) {
    const canvas = document.getElementById(canvasId);
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = new Canvas(canvas);
      this.canvas.resizeByClientSize();
    } else {
      throw `canvas is not a HTMLCanvasElement!`;
    }
    const gl = canvas.getContext('webgl', {});
  }
}
