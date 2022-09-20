import { IndexFormat } from './enums/IndexFormat';
import { Buffer } from './Buffer';
/**
 * Index buffer binding.
 */
export declare class IndexBufferBinding {
    /** Index buffer bound buffer. */
    _buffer: Buffer;
    /** Index format. */
    _format: IndexFormat;
    /**
     * Index buffer.
     */
    get buffer(): Buffer;
    /**
     * Index buffer format.
     */
    get format(): IndexFormat;
    /**
     * Create index buffer binding.
     * @param buffer - Index buffer
     * @param format - Index buffer format
     */
    constructor(buffer: Buffer, format: IndexFormat);
}
