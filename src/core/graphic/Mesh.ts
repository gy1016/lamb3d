import { BufferUtil } from '../graphic/BufferUtil';
import { IndexBufferBinding } from '../graphic/IndexBufferBinding';
import { VertexBufferBinding } from '../graphic/VertexBufferBinding';
import { VertexElement } from '../graphic/VertexElement';
import { SubMesh } from '../graphic/SubMesh';
import { ShaderProgram } from '../shader/ShaderProgram';
import { Renderer } from '../Renderer';
import { MeshTopology } from './enums/MeshTopology';

/**
 * Grid abstract class.
 */
export abstract class Mesh {
  /** Name. */
  name: string;
  /** Vertex entity record table, used for caching. */
  _vertexElementMap: Record<string, VertexElement> = {};
  /** The storage type of the index, for example: UInt8. */
  _glIndexType: number;
  /** Each index occupies several bytes, 8 bits per byte. */
  _glIndexByteCount: number;
  /** A platform that provides rendering capabilities. */
  _platformPrimitive: Renderer;
  /** A Mesh may consist of multiple vertex instances. */
  _instanceCount: number = 0;
  /** The vertex buffer corresponding to the mesh. */
  _vertexBufferBindings: VertexBufferBinding[] = [];
  /** The index buffer corresponding to the mesh */
  _indexBufferBinding: IndexBufferBinding = null;
  /** Array of vertex elements. */
  _vertexElements: VertexElement[] = [];

  protected gl: WebGLRenderingContext;
  /** Drawing information for each element. */
  private _subMeshes: SubMesh[] = [];

  /**
   * First sub-mesh. Rendered using the first material.
   */
  get subMesh(): SubMesh | null {
    return this._subMeshes[0] || null;
  }

  /**
   * A collection of sub-mesh, each sub-mesh can be rendered with an independent material.
   */
  get subMeshes(): Readonly<SubMesh[]> {
    return this._subMeshes;
  }

  /**
   * Add sub-mesh, each sub-mesh can correspond to an independent material.
   * @param subMesh - Start drawing offset, if the index buffer is set, it means the offset in the index buffer, if not set, it means the offset in the vertex buffer
   * @returns Sub-mesh
   */
  addSubMesh(subMesh: SubMesh): SubMesh;

  /**
   * Add sub-mesh, each sub-mesh can correspond to an independent material.
   * @param start - Start drawing offset, if the index buffer is set, it means the offset in the index buffer, if not set, it means the offset in the vertex buffer
   * @param count - Drawing count, if the index buffer is set, it means the count in the index buffer, if not set, it means the count in the vertex buffer
   * @param topology - Drawing topology, default is MeshTopology.Triangles
   * @returns Sub-mesh
   */
  addSubMesh(start: number, count: number, topology?: MeshTopology): SubMesh;

  addSubMesh(
    startOrSubMesh: number | SubMesh,
    count?: number,
    topology: MeshTopology = MeshTopology.Triangles,
  ): SubMesh {
    if (typeof startOrSubMesh === 'number') {
      startOrSubMesh = new SubMesh(startOrSubMesh, count, topology);
    }
    this._subMeshes.push(startOrSubMesh);
    return startOrSubMesh;
  }

  /**
   * Remove sub-mesh.
   * @param subMesh - Sub-mesh needs to be removed
   */
  removeSubMesh(subMesh: SubMesh): void {
    const subMeshes = this._subMeshes;
    const index = subMeshes.indexOf(subMesh);
    if (index !== -1) {
      subMeshes.splice(index, 1);
    }
  }

  /**
   * Clear all sub-mesh.
   */
  clearSubMesh(): void {
    this._subMeshes.length = 0;
  }

  constructor(gl: WebGLRenderingContext, name?: string) {
    this.gl = gl;
    this.name = name;
    this._platformPrimitive = new Renderer(gl, this);
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
    this._platformPrimitive.draw(shaderProgram, subMesh);
    // this._platformPrimitive.testDraw(shaderProgram);
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
