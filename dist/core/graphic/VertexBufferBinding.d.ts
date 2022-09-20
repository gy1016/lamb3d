import { Buffer } from './Buffer';
/**
 * Vertex buffer binding.
 */
export declare class VertexBufferBinding {
    /** Buffer to which vertex elements are bound. */
    _buffer: Buffer;
    /** Span between each vertex. */
    _stride: number;
    /**
     * Vertex buffer.
     */
    get buffer(): Buffer;
    /**
     * Vertex buffer stride.
     */
    get stride(): number;
    /**
     * Create vertex buffer.
     * @param buffer - Vertex buffer
     * @param stride - Vertex buffer stride
     */
    constructor(buffer: Buffer, stride: number);
}
