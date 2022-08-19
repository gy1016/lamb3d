import { IndexFormat } from './enums/IndexFormat';
import { Buffer } from './Buffer';

/**
 * Index buffer binding.
 */
export class IndexBufferBinding {
  /** Index buffer bound buffer. */
  _buffer: Buffer;
  /** Index format. */
  _format: IndexFormat;

  /**
   * Index buffer.
   */
  get buffer(): Buffer {
    return this._buffer;
  }

  /**
   * Index buffer format.
   */
  get format(): IndexFormat {
    return this._format;
  }

  /**
   * Create index buffer binding.
   * @param buffer - Index buffer
   * @param format - Index buffer format
   */
  constructor(buffer: Buffer, format: IndexFormat) {
    this._buffer = buffer;
    this._format = format;
  }
}
