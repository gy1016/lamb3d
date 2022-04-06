import { WebCanvas } from './WebCanvas';
import { Canvas } from '../core/Canvas';

/**
 * WebGL mode.
 */
export enum WebGLMode {
  /** Auto, use WebGL2.0 if support, or will fallback to WebGL1.0. */
  Auto = 0,
  /** WebGL2.0. */
  WebGL2 = 1,
  /** WebGL1.0, */
  WebGL1 = 2,
}

export class WebGLRenderer {
  private _options: any;
  private _gl: WebGLRenderingContext;

  private _isWebGL2: boolean;
  private _activeTextureID: number;

  /**
   * GL Context
   * @member {WebGLRenderingContext}
   */
  get gl() {
    return this._gl;
  }

  constructor(options: any = {}) {
    this._options = options;
  }

  init(canvas: Canvas) {
    const webCanvas = (canvas as WebCanvas)._webCanvas;
    const webGLMode = WebGLMode.Auto;
    let gl: WebGLRenderingContext | WebGL2RenderingContext;

    if (webGLMode == WebGLMode.Auto || webGLMode == WebGLMode.WebGL1) {
      gl = webCanvas.getContext('webgl');
      this._isWebGL2 = false;
    }

    if (!gl) {
      throw new Error('Get GL Context FAILED.');
    }

    this._gl = gl;
    this._activeTextureID = gl.TEXTURE0;
  }
}
