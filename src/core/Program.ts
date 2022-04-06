import { IWebGLCtx } from './WebGLEngine';

export class Program {
  constructor(gl: IWebGLCtx, vShader: string, fShader: string) {
    const vertexShader = Program.loadShader(gl, gl.VERTEX_SHADER, vShader);
    const fragmentShader = Program.loadShader(gl, gl.FRAGMENT_SHADER, fShader);

    if (!vertexShader || !fragmentShader) {
      return null;
    }

    const program = gl.createProgram();
    if (!program) {
      return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      const error = gl.getProgramInfoLog(program);
      console.log('Failed to link program: ' + error);
      gl.deleteProgram(program);
      gl.deleteShader(fragmentShader);
      gl.deleteShader(vertexShader);
      return null;
    }

    return program;
  }

  static loadShader(gl: IWebGLCtx, type: number, source: string) {
    const shader = gl.createShader(type);
    if (shader === null) {
      console.log('Unable to create shader');
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      const error = gl.getShaderInfoLog(shader);
      console.log('Failed to compile shader: ' + error);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }
}
