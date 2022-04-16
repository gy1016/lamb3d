import { IWebGLOptions } from './WebGLEngine';

interface IWebGLCtx extends WebGLRenderingContext {
  program?: WebGLProgram;
}

export class WebGLContext {
  private _gl: IWebGLCtx;

  get gl() {
    return this._gl;
  }

  constructor(canvas: HTMLCanvasElement, options: IWebGLOptions = {}) {
    let { mode } = options;
    if (!mode) {
      mode = 'webgl';
    }

    // 这里有问题，目前只支持webgl的情况，其他mode后续引入
    const gl = canvas.getContext(mode) as WebGLRenderingContext;
    if (!gl) {
      throw new Error(`Failed to get the rendering context for ${mode}`);
    }
    this._gl = gl;
  }

  loadShader(type: number, source: string): WebGLShader {
    const shader = this._gl.createShader(type);
    if (shader === null) {
      console.log('unable to create shader');
      return null;
    }

    // Set the shader program
    this._gl.shaderSource(shader, source);

    // Compile the shader
    this._gl.compileShader(shader);

    // Check the result of compilation
    const compiled = this._gl.getShaderParameter(
      shader,
      this._gl.COMPILE_STATUS,
    );

    if (!compiled) {
      const error = this._gl.getShaderInfoLog(shader);
      console.log('Failed to compile shader: ' + error);
      this._gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  createProgram(vshader: string, fshader: string) {
    // Create shader object
    const vertexShader = this.loadShader(this._gl.VERTEX_SHADER, vshader);
    const fragmentShader = this.loadShader(this._gl.FRAGMENT_SHADER, fshader);

    if (!vertexShader || !fragmentShader) {
      return null;
    }

    // Create a program object
    const program = this._gl.createProgram();
    if (!program) {
      return null;
    }

    // Attach the shader objects
    this._gl.attachShader(program, vertexShader);
    this._gl.attachShader(program, fragmentShader);

    // Link the program object
    this._gl.linkProgram(program);

    // Check the result of linking
    const linked = this._gl.getProgramParameter(program, this._gl.LINK_STATUS);
    if (!linked) {
      const error = this._gl.getProgramInfoLog(program);
      console.log('Failed to link program: ' + error);
      this._gl.deleteProgram(program);
      this._gl.deleteShader(fragmentShader);
      this._gl.deleteShader(vertexShader);
      return null;
    }

    return program;
  }

  initShaders(vshader: string, fshader: string) {
    const program = this.createProgram(vshader, fshader);
    if (!program) {
      console.log('Failed to create program');
      return false;
    }

    this._gl.useProgram(program);
    this._gl.program = program;

    return true;
  }
}
