export interface IWebGLCtx extends WebGLRenderingContext {
  program?: WebGLProgram;
}

export class WeblGLEngine {
  public gl: IWebGLCtx;

  constructor(canvasId: string) {
    const canvasEl = document.getElementById(canvasId);
    if (!canvasEl) {
      throw new Error('Not find canvasId!');
    }

    const gl = (canvasEl as HTMLCanvasElement).getContext('webgl');
    if (!gl) {
      throw new Error('Initialize webgl context failure!');
    }

    this.gl = (canvasEl as HTMLCanvasElement).getContext('webgl');
  }
}
