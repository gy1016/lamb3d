export interface IWebGLCtx extends WebGLRenderingContext {
  program?: WebGLProgram;
}

export class WebGLEngine {
  public webgl: IWebGLCtx;

  constructor(canvasId: string) {
    const canvasEl = document.getElementById(canvasId);
    if (!canvasEl) {
      throw new Error('Not find canvasId!');
    }

    const gl = (canvasEl as HTMLCanvasElement).getContext('webgl');
    if (!gl) {
      throw new Error('Initialize webgl context failure!');
    }

    this.webgl = gl;
  }

  useProgram(program: WebGLProgram) {
    this.webgl.useProgram(program);
    this.webgl.program = program;
  }
}
