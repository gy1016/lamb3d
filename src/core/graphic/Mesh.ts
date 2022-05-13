import { BufferUtil } from '../graphic/BufferUtil';
import { IndexBufferBinding } from '../graphic/IndexBufferBinding';
import { VertexBufferBinding } from '../graphic/VertexBufferBinding';
import { VertexElement } from '../graphic/VertexElement';
import { SubMesh } from '../graphic/SubMesh';
import { ShaderProgram } from '../shader/ShaderProgram';
import { Renderer } from '../Renderer';

export abstract class Mesh {
  /** Name. */
  name: string;

  _vertexElementMap: Record<string, VertexElement> = {};
  _glIndexType: number;
  _glIndexByteCount: number;

  _instanceCount: number = 0;
  _vertexBufferBindings: VertexBufferBinding[] = [];
  _indexBufferBinding: IndexBufferBinding = null;
  _vertexElements: VertexElement[] = [];

  private _subMeshes: SubMesh[] = [];

  constructor(name?: string) {
    this.name = name;
  }

  _clearVertexElements(): void {
    // 这个清空方法妙啊
    this._vertexElements.length = 0;
    const vertexElementMap = this._vertexElementMap;
    for (const k in vertexElementMap) {
      delete vertexElementMap[k];
    }
  }

  _addVertexElement(element: VertexElement): void {
    const { semantic } = element;
    this._vertexElementMap[semantic] = element;
    this._vertexElements.push(element);
  }

  _draw(shaderProgram: ShaderProgram, subMesh: SubMesh): void {
    Renderer.draw(shaderProgram, subMesh);
  }

  _onDestroy(): void {
    this._vertexBufferBindings = null;
    this._indexBufferBinding = null;
    this._vertexElements = null;
    this._vertexElementMap = null;
  }

  protected _setVertexElements(elements: VertexElement[]): void {
    this._clearVertexElements();
    for (let i = 0, n = elements.length; i < n; i++) {
      this._addVertexElement(elements[i]);
    }
  }

  protected _setVertexBufferBinding(index: number, binding: VertexBufferBinding): void {
    this._vertexBufferBindings[index] = binding;
  }

  protected _setIndexBufferBinding(binding: IndexBufferBinding | null): void {
    if (binding) {
      this._indexBufferBinding = binding;
      this._glIndexType = BufferUtil._getGLIndexType(binding.format);
      this._glIndexByteCount = BufferUtil._getGLIndexByteCount(binding.format);
    } else {
      this._indexBufferBinding = null;
      this._glIndexType = undefined;
    }
  }
}
