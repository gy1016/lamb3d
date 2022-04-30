import { Program } from '../program/Program';

export class Render {
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
    const a_attribute = gl.getAttribLocation(gl.program, attribute);
    if (a_attribute < 0) {
      console.log('Failed to get the storage location of ' + attribute);
      return false;
    }
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return true;
  }

  static drawRender() {}
}
