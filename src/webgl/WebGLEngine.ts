import { Engine } from '../core/Engine';
import { WebCanvas } from './WebCanvas';
import { WebGLRenderer } from './WebGLRenderer';

export class WebGLEngine extends Engine {
  /**
   * Create an engine suitable for the WebGL platform.
   * @param canvas - Native web canvas
   * @param physics - Physics Engine
   * @param webGLRendererOptions - WebGL renderer options
   */
  constructor(canvas: string | HTMLCanvasElement) {
    const webCanvas = new WebCanvas(
      <HTMLCanvasElement>(typeof canvas === 'string' ? document.getElementById(canvas) : canvas),
    );
    const hardwareRenderer = new WebGLRenderer();
    super(webCanvas, hardwareRenderer);
  }

  get canvas(): WebCanvas {
    return this._canvas as WebCanvas;
  }
}
