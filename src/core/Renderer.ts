import { ShaderProgram } from './shader/ShaderProgram';
import { Mesh, SubMesh } from './graphic';

export class Renderer {
  static currentBindProgram: ShaderProgram;
  private gl: WebGLRenderingContext;

  protected attribLocArray: number[];
  protected readonly _primitive: Mesh;

  constructor(gl: WebGLRenderingContext, primitive: Mesh) {
    this._primitive = primitive;
    this.gl = gl;
  }

  /**
   * Bind buffer and attribute.
   */
  protected bindBufferAndAttrib(shaderProgram: ShaderProgram): void {
    const gl = this.gl;
    const primitive = this._primitive;
    const vertexBufferBindings = primitive._vertexBufferBindings;

    this.attribLocArray = [];
    const attributeLocation = shaderProgram.attributeLocation;
    const attributes = primitive._vertexElementMap;

    let vbo: WebGLBuffer;
    let lastBoundVbo: WebGLBuffer;

    for (const name in attributeLocation) {
      const loc = attributeLocation[name];
      if (loc === -1) continue;

      const element = attributes[name];
      if (element) {
        const { buffer, stride } = vertexBufferBindings[element.bindingIndex];
        vbo = buffer._nativeBuffer;
        if (lastBoundVbo !== vbo) {
          lastBoundVbo = vbo;
          gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        }

        gl.enableVertexAttribArray(loc);
        const { size, type, normalized } = element._glElementInfo;
        // gl.vertexAttribPointer(loc, size, type, normalized, 0, element.offset);
        gl.vertexAttribPointer(loc, size, type, normalized, stride, element.offset);
        this.attribLocArray.push(loc);
      } else {
        console.warn('vertex attribute not found: ' + name);
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  /**
   * Draw the primitive.
   */
  draw(shaderProgram: ShaderProgram, subMesh: SubMesh): void {
    const gl = this.gl;
    const primitive = this._primitive;

    this.bindBufferAndAttrib(shaderProgram);

    const { _indexBufferBinding, _instanceCount, _glIndexType, _glIndexByteCount } = primitive;
    const { topology, start, count } = subMesh;

    if (!_instanceCount) {
      if (_indexBufferBinding) {
        const { _nativeBuffer } = _indexBufferBinding.buffer;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _nativeBuffer);
        gl.drawElements(topology, count, _glIndexType, start * _glIndexByteCount);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      } else {
        gl.drawArrays(topology, start, count);
      }
    }
  }

  // It would be better practice to encapsulate this information into a renderInfo
  // static initArrayBuffer(
  //   gl: WebGLRenderingContext,
  //   attribute: string,
  //   data: ArrayBuffer,
  //   num: number,
  //   type: number,
  // ): boolean {
  //   const buffer = gl.createBuffer();
  //   if (!buffer) {
  //     console.log('Failed to create the buffer object');
  //     return false;
  //   }
  //   gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  //   const a_attribute = gl.getAttribLocation(Renderer.shaderProgram.glProgram, attribute);
  //   if (a_attribute < 0) {
  //     console.log('Failed to get the storage location of ' + attribute);
  //     return false;
  //   }
  //   gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  //   gl.enableVertexAttribArray(a_attribute);
  //   gl.bindBuffer(gl.ARRAY_BUFFER, null);
  //   return true;
  // }

  // //
  // static initShaderProgram(gl: WebGLRenderingContext, entity: Entity): boolean {
  //   const { shader } = entity.material;
  //   Renderer.shaderProgram = shader.getShaderProgram(gl);
  //   return Renderer.shaderProgram.isValid;
  // }

  // static drawRender(gl: WebGLRenderingContext, entity: Entity): number {
  //   if (!Renderer.initShaderProgram(gl, entity)) {
  //     console.error('initShaderProgram failed...');
  //   }

  //   const data = new Float32Array(entity.mesh.getPostions());
  //   const indices = entity.mesh.getIndices();

  //   if (!Renderer.initArrayBuffer(gl, 'a_Position', data, 3, gl.FLOAT)) return -1;

  //   const indexBuffer = gl.createBuffer();
  //   if (!indexBuffer) {
  //     console.log('Failed to create the buffer object');
  //     return -1;
  //   }
  //   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  //   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  //   return indices.length;
  // }
}
