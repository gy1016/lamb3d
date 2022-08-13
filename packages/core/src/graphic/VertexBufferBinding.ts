import { Buffer } from './Buffer';

/**
 * Vertex buffer binding.
 */
export class VertexBufferBinding {
  _buffer: Buffer;
  /** @internal */
  _stride: number;

  /**
   * Vertex buffer.
   */
  get buffer(): Buffer {
    return this._buffer;
  }

  /**
   * Vertex buffer stride.
   */
  get stride(): number {
    return this._stride;
  }

  /**
   * Create vertex buffer.
   * @param buffer - Vertex buffer
   * @param stride - Vertex buffer stride
   */
  constructor(buffer: Buffer, stride: number) {
    this._buffer = buffer;
    this._stride = stride;
  }
}
