import { ShaderProgram } from './shader/ShaderProgram';
import { Entity } from './Entity';

export class Renderer {
  static shaderProgram: ShaderProgram;

  // It would be better practice to encapsulate this information into a renderInfo
  static initArrayBuffer(
    gl: WebGLRenderingContext,
    attribute: string,
    data: ArrayBuffer,
    num: number,
    type: number,
  ): boolean {
    const buffer = gl.createBuffer();
    if (!buffer) {
      console.log('Failed to create the buffer object');
      return false;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const a_attribute = gl.getAttribLocation(Renderer.shaderProgram.glProgram, attribute);
    if (a_attribute < 0) {
      console.log('Failed to get the storage location of ' + attribute);
      return false;
    }
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return true;
  }

  //
  static initShaderProgram(gl: WebGLRenderingContext, entity: Entity): boolean {
    const { shader } = entity.material;
    Renderer.shaderProgram = shader.getShaderProgram(gl);
    return Renderer.shaderProgram.isValid;
  }

  static drawRender(gl: WebGLRenderingContext, entity: Entity): number {
    if (!Renderer.initShaderProgram(gl, entity)) {
      console.error('initShaderProgram failed...');
    }

    const data = new Float32Array(entity.mesh.getPostions());
    const indices = entity.mesh.getIndices();

    if (!Renderer.initArrayBuffer(gl, 'a_Position', data, 3, gl.FLOAT)) return -1;

    const indexBuffer = gl.createBuffer();
    if (!indexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    return indices.length;
  }
}