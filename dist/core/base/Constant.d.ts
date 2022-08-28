/**
 * Data type enumeration
 */
export declare enum DataType {
    /** Float */
    FLOAT = 5126,
    /** Floating-point two-dimensional vector */
    FLOAT_VEC2 = 35664,
    /** Floating-point three-dimensional vector */
    FLOAT_VEC3 = 35665,
    /** Floating-point four-dimensional vector */
    FLOAT_VEC4 = 35666,
    /** Integer */
    INT = 5124,
    /** Integer two-dimensional vector */
    INT_VEC2 = 35667,
    /** Integer three-dimensional vector */
    INT_VEC3 = 35668,
    /** Integer four-dimensional vector */
    INT_VEC4 = 35669,
    /** Boolean */
    BOOL = 35670,
    /** Boolean two-dimensional vector */
    BOOL_VEC2 = 35671,
    /** Boolean three-dimensional vector */
    BOOL_VEC3 = 35672,
    /** Boolean four-dimensional vector */
    BOOL_VEC4 = 35673,
    /** Second-order matrix */
    FLOAT_MAT2 = 35674,
    /** Third-order matrix */
    FLOAT_MAT3 = 35675,
    /** Fourth-order matrix */
    FLOAT_MAT4 = 35676,
    /** Float array */
    FLOAT_ARRAY = 35677,
    /** Floating-point two-dimensional vector array */
    FLOAT_VEC2_ARRAY = 100000,
    /** Floating-point three-dimensional vector array */
    FLOAT_VEC3_ARRAY = 100001,
    /** Floating-point four-dimensional vector array */
    FLOAT_VEC4_ARRAY = 100002,
    /** Integer array */
    INT_ARRAY = 100003,
    /** Integer two-dimensional vector array */
    INT_VEC2_ARRAY = 100004,
    /** Integer three-dimensional vector array */
    INT_VEC3_ARRAY = 100005,
    /** Integer four-dimensional vector array */
    INT_VEC4_ARRAY = 100006,
    /** Second-order matrix array */
    FLOAT_MAT2_ARRAY = 100007,
    /** Third-order matrix array */
    FLOAT_MAT3_ARRAY = 100008,
    /** Fourth-order matrix array */
    FLOAT_MAT4_ARRAY = 100009,
    /** 2D texture sampler array */
    SAMPLER_2D_ARRAY = 100010,
    /** Cube map texture sampler array */
    SAMPLER_CUBE_ARRAY = 100011,
    /** 2D sampler */
    SAMPLER_2D = 35678,
    /** Cube map Texture sampler */
    SAMPLER_CUBE = 35680,
    /** Byte */
    BYTE = 5120,
    /** Unsigned byte */
    UNSIGNED_BYTE = 5121,
    /** Short */
    SHORT = 5122,
    /** Unsigned short */
    UNSIGNED_SHORT = 5123,
    /** Unsigned int */
    UNSIGNED_INT = 5125,
    TEXTURE_CUBE_MAP_POSITIVE_X = 34069,
    TEXTURE_CUBE_MAP_NEGATIVE_X = 34070,
    TEXTURE_CUBE_MAP_POSITIVE_Y = 34071,
    TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072,
    TEXTURE_CUBE_MAP_POSITIVE_Z = 34073,
    TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074
}
/**
 * GL Capabilities
 * Some capabilities can be smoothed out by extension, and some capabilities must use WebGL 2.0.
 * */
export declare enum GLCapabilityType {
    shaderVertexID = "shaderVertexID",
    standardDerivatives = "OES_standard_derivatives",
    shaderTextureLod = "EXT_shader_texture_lod",
    elementIndexUint = "OES_element_index_uint",
    depthTexture = "WEBGL_depth_texture",
    drawBuffers = "WEBGL_draw_buffers",
    vertexArrayObject = "OES_vertex_array_object",
    instancedArrays = "ANGLE_instanced_arrays",
    multipleSample = "multipleSampleOnlySupportedInWebGL2",
    textureFloat = "OES_texture_float",
    textureFloatLinear = "OES_texture_float_linear",
    textureHalfFloat = "OES_texture_half_float",
    textureHalfFloatLinear = "OES_texture_half_float_linear",
    WEBGL_colorBufferFloat = "WEBGL_color_buffer_float",
    colorBufferFloat = "EXT_color_buffer_float",
    colorBufferHalfFloat = "EXT_color_buffer_half_float",
    textureFilterAnisotropic = "EXT_texture_filter_anisotropic",
    blendMinMax = "EXT_blend_minmax",
    astc = "WEBGL_compressed_texture_astc",
    astc_webkit = "WEBKIT_WEBGL_compressed_texture_astc",
    etc = "WEBGL_compressed_texture_etc",
    etc_webkit = "WEBKIT_WEBGL_compressed_texture_etc",
    etc1 = "WEBGL_compressed_texture_etc1",
    etc1_webkit = "WEBKIT_WEBGL_compressed_texture_etc1",
    pvrtc = "WEBGL_compressed_texture_pvrtc",
    pvrtc_webkit = "WEBKIT_WEBGL_compressed_texture_pvrtc",
    s3tc = "WEBGL_compressed_texture_s3tc",
    s3tc_webkit = "WEBKIT_WEBGL_compressed_texture_s3tc"
}
export declare type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;
