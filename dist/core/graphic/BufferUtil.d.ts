import { BufferUsage } from './enums/BufferUsage';
import { VertexElementFormat } from './enums/VertexElementFormat';
import { DataType } from '../base/Constant';
import { IndexFormat } from './enums/IndexFormat';
/**
 * Information about a single vertex element.
 */
export interface ElementInfo {
    /** Number of components per vertex. */
    size: number;
    /** Type of data. */
    type: DataType;
    /** Whether normalization is required. */
    normalized: boolean;
}
/**
 * Utility functions for processing Buffers.
 */
export declare class BufferUtil {
    /**
     * Obtain the usage of Buffer according to the incoming enumeration.
     * @param gl WebGL rendering context.
     * @param bufferUsage Buffer usage.
     * @returns The number code used by the internal buffer of gl.
     */
    static _getGLBufferUsage(gl: WebGLRenderingContext, bufferUsage: BufferUsage): number;
    /**
     * Get index type code.
     * @param indexFormat Index type enumeration.
     * @returns The number code used by the internal type of gl.
     */
    static _getGLIndexType(indexFormat: IndexFormat): DataType;
    /**
     * Get gl index byte count.
     * @param indexFormat Index type enumeration.
     * @returns Index byte count.
     */
    static _getGLIndexByteCount(indexFormat: IndexFormat): DataType;
    /**
     * Returns vertex information based on the element's vertex format.
     */
    static _getElementInfo(format: VertexElementFormat): ElementInfo;
}
