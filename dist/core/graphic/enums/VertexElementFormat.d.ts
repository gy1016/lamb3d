/**
 * Vertex element format.
 */
export declare enum VertexElementFormat {
    /** 32-bit float */
    Float = 0,
    /** Two-dimensional 32-bit float */
    Vector2 = 1,
    /** Three-dimensional 32-bit float */
    Vector3 = 2,
    /** Four-dimensional 32-bit float */
    Vector4 = 3,
    /** Four-dimensional 8-bit integer,range is [-128,127] */
    Byte4 = 4,
    /** Four-dimensional 8-bit Unsigned integer, range is [0,255] */
    UByte4 = 5,
    /** Four-dimensional 8-bit Normalized integer, range is [-1,1] */
    NormalizedByte4 = 6,
    /** Four-dimensional 8-bit Normalized unsigned integer, range is [0,1] */
    NormalizedUByte4 = 7,
    /** Two-dimensional 16-bit integer, range is[-32768, 32767] */
    Short2 = 8,
    /** Two-dimensional 16-bit Unsigned integer, range is [0, 65535] */
    UShort2 = 9,
    /** Two-dimensional 16-bit Unsigned integer, range is [-1, 1] */
    NormalizedShort2 = 10,
    /** Two-dimensional 16-bit Normalized unsigned integer, range is [0, 1] */
    NormalizedUShort2 = 11,
    /** Four-dimensional 16-bit integer, range is [-32768, 32767] */
    Short4 = 12,
    /** Four-dimensional 16-bit Unsigned integer, range is [0, 65535] */
    UShort4 = 13,
    /** Four-dimensional 16-bit Normalized integer, range is[-1, 1] */
    NormalizedShort4 = 14,
    /** Four-dimensional 16-bit Normalized unsigned integer, range is [0, 1] */
    NormalizedUShort4 = 15
}
