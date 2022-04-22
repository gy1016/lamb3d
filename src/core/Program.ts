export class Program {
  gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext, vShader: string, fShader: string) {
    this.gl = gl;
  }

  static loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      console.error(`shader compiler error type = ${type} info = ${info}`);
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  static initialShaderProgram(
    gl: WebGLRenderingContext,
    vShader: string,
    fShader: string,
  ) {
    const vs = Program.loadShader(gl, gl.VERTEX_SHADER, vShader);
    if (vs === null) {
      console.error('vertex shader got something wrong', vShader);
    }

    const fs = Program.loadShader(gl, gl.FRAGMENT_SHADER, fShader);
    if (fs === null) {
      console.error('fragment shader got something wrong', fShader);
    }

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(
        `unable to initialize the shader program: ${gl.getProgramInfoLog(
          shaderProgram,
        )}`,
      );

      gl.deleteProgram(shaderProgram);
      return null;
    }
    return shaderProgram;
  }

  static createProgramInfo(
    gl: WebGLRenderingContext,
    shaderProgram: WebGLProgram,
  ) {}
}
