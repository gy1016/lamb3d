import { AttributesInfo } from './AttributesInfo';
import { UniformsInfo } from './UniformsInfo';
import { ProgramInfo } from './ProgramInfo';

export class Program {
  shaderProgram: WebGLProgram;
  gl: WebGLRenderingContext;
  programInfo: ProgramInfo;

  constructor(gl: WebGLRenderingContext, vshader: string, fshader: string) {
    this.gl = gl;
    this.shaderProgram = Program.initialShaderProgram(gl, vshader, fshader);
    this.programInfo = Program.createProgramInfo(gl, this.shaderProgram);
  }

  static loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (shader === null) {
      console.log('unable to create shader');
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

  static initialShaderProgram(gl: WebGLRenderingContext, vshader: string, fshader: string): WebGLProgram | null {
    const vertexShader = Program.loadShader(gl, gl.VERTEX_SHADER, vshader);
    const fragmentShader = Program.loadShader(gl, gl.FRAGMENT_SHADER, fshader);

    if (!vertexShader || !fragmentShader) {
      return null;
    }

    // Create a program object
    const program = gl.createProgram();
    if (!program) {
      return null;
    }

    // Attach the shader objects
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // Link the program object
    gl.linkProgram(program);

    // Check the result of linking
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

  /**
   * get attrubutes and uniform variable location
   * @param gl
   * @param shaderProgram
   * @returns ProgramInfo
   */
  static createProgramInfo(gl: WebGLRenderingContext, shaderProgram: WebGLProgram) {
    const attributes = new AttributesInfo();
    for (const attr in attributes) {
      const loc = gl.getAttribLocation(shaderProgram, attr);
      if (loc !== -1 && loc !== null && loc !== undefined) {
        attributes[attr] = loc;
      }
    }

    const uniforms = new UniformsInfo();
    for (const uni in uniforms) {
      const uloc = gl.getUniformLocation(shaderProgram, uni);
      if (uloc !== -1 && uloc !== null && uloc !== undefined) {
        uniforms[uni].loc = uloc;
      }
    }

    return new ProgramInfo(shaderProgram, attributes, uniforms);
  }
}
