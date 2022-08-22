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
}
