import { ShaderProgram } from './shader/ShaderProgram';
import { Mesh, SubMesh } from './graphic';

/**
 * Renderer, each Mesh will have a renderer instance.
 */
export class Renderer {
  /** Current bind program. */
  static glProgram: ShaderProgram;
  // TODO: 要接入webgl2, 应该抽出一个类型
  private gl: WebGLRenderingContext;
  /** Array of addresses of attribute variables in shader programs. */
  protected attribLocArray: number[];
  /** Mesh to be rendered. */
  protected readonly _primitive: Mesh;

  /**
   * Render based on rendering context and grid.
   * @param gl WebGL rendering context.
   * @param primitive Mesh to be rendered.
   */
  constructor(gl: WebGLRenderingContext, primitive: Mesh) {
    this._primitive = primitive;
    this.gl = gl;
    this.initRenderState();
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

  // TODO: 这个渲染状态是不是应该考虑放到材质里面，并且抽出一个RenderState
  /**
   * Clear depth, color buffer, etc.
   */
  initRenderState() {
    const gl = this.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    gl.cullFace(gl.FRONT);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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

  testDraw(shaderProgram: ShaderProgram) {
    const gl = this.gl;
    const position = new Float32Array([
      1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0, //front面 v0-4
      1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0, //right v0345
      1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0, //up v0561
      -1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      1.0,
      -1.0, //left
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0, //down
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      -1.0,
      -1.0, //back
    ]);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(shaderProgram.glProgram, 'POSITION');
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(loc);
    const indice = new Uint8Array([
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21,
      22, 20, 22, 23,
    ]);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indice, gl.STATIC_DRAW);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.drawElements(gl.TRIANGLES, indice.length, gl.UNSIGNED_BYTE, 0);
  }
}
