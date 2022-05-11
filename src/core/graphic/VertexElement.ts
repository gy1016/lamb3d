import { VertexElementFormat } from './enums/VertexElementFormat';
import { ElementInfo } from './BufferUtil';
/**
 * Vertex element.
 */
export declare class VertexElement {
  _glElementInfo: ElementInfo;
  private _semantic;
  private _offset;
  private _format;
  private _bindingIndex;
  private _instanceStepRate;
  /**
   * Vertex semantic.
   */
  get semantic(): string;
  /**
   * Vertex data byte offset.
   */
  get offset(): number;
  /**
   * Vertex data format.
   */
  get format(): VertexElementFormat;
  /**
   * Vertex buffer binding index.
   */
  get bindingIndex(): number;
  /**
   * Instance cadence, the number of instances drawn for each vertex in the buffer, non-instance elements must be 0.
   */
  get instanceStepRate(): number;
  /**
   * Create vertex element.
   * @param semantic - Input vertex semantic
   * @param offset - Vertex data byte offset
   * @param format - Vertex data format
   * @param bindingIndex - Vertex buffer binding index
   * @param instanceStepRate - Instance cadence, the number of instances drawn for each vertex in the buffer, non-instance elements must be 0.
   */
  constructor(
    semantic: string,
    offset: number,
    format: VertexElementFormat,
    bindingIndex: number,
    instanceStepRate?: number,
  );
}
