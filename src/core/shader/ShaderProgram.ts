export class ShaderProgram {
  private static _counter = 0;

  id: number;

  private _isValid: boolean;
  private _gl: WebGLRenderingContext;
  private _vertexShader: WebGLShader;
  private _fragmentShader: WebGLShader;
  private _glProgram: WebGLProgram;

  get glProgram() {
    return this._glProgram;
  }

  /**
   * Whether this shader program is valid.
   */
  get isValid(): boolean {
    return this._isValid;
  }

  constructor(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
    this._gl = gl;
    this._glProgram = this._createProgram(vertexSource, fragmentSource);
  }

  private _createProgram(vertexSource: string, fragmentSource: string): WebGLProgram | null {
    const gl = this._gl;

    // create and compile shader
    const vertexShader = this._createShader(gl.VERTEX_SHADER, vertexSource);
    if (!vertexShader) {
      return null;
    }

    const fragmentShader = this._createShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!fragmentShader) {
      return null;
    }

    // link program and shader
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.validateProgram(program);

    if (gl.isContextLost()) {
      console.error('Context lost while linking program.');
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return null;
    }

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not link WebGL program. \n' + gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    this._vertexShader = vertexShader;
    this._fragmentShader = fragmentShader;

    return program;
  }

  private _createShader(shaderType: number, shaderSource: string): WebGLShader | null {
    const gl = this._gl;
    const shader = gl.createShader(shaderType);

    if (!shader) {
      console.error('Context lost while create shader.');
      return null;
    }

    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (gl.isContextLost()) {
      console.error('Context lost while compiling shader.');
      gl.deleteShader(shader);
      return null;
    }

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Could not compile WebGL shader.\n${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  destroy(): void {
    const gl = this._gl;
    this._vertexShader && gl.deleteShader(this._vertexShader);
    this._fragmentShader && gl.deleteShader(this._fragmentShader);
    this._glProgram && gl.deleteProgram(this._glProgram);
  }
}
