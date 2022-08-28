import { TextureFilterMode } from './enums/TextureFilterMode';
import { TextureFormat } from './enums/TextureFormat';
import { TextureWrapMode } from './enums/TextureWrapMode';
/**
 * Texture specific format information.
 */
export interface TextureFormatDetail {
    /** Texture color internal format: RGB, RGBA. */
    internalFormat: GLint;
    /** Texture color base format: RGB, RGBA. */
    baseFormat?: GLenum;
    /** Texel data type. */
    dataType?: GLenum;
    /** Whether texture compression. */
    isCompressed: boolean;
}
/**
 * The base class of texture, contains some common functions of texture-related classes.
 */
export declare abstract class Texture {
    name: string;
    /** Whether to enable mipmap. */
    _mipmap: boolean;
    /** Texture object storage address. */
    _glTexture: WebGLTexture;
    /** Texture sampler. */
    _glTarget: number;
    /** Texture format detail. */
    _formatDetail: TextureFormatDetail;
    /** Texture format. */
    protected _format: TextureFormat;
    /** Texture width. */
    protected _width: number;
    /** Texture height. */
    protected _height: number;
    protected _mipmapCount: number;
    protected _gl: WebGLRenderingContext;
    private _wrapModeU;
    private _wrapModeV;
    private _filterMode;
    get format(): TextureFormat;
    get width(): number;
    get height(): number;
    get wrapModeU(): TextureWrapMode;
    set wrapModeU(value: TextureWrapMode);
    get wrapModeV(): TextureWrapMode;
    set wrapModeV(value: TextureWrapMode);
    get mipmapCount(): number;
    get filterMode(): TextureFilterMode;
    set filterMode(value: TextureFilterMode);
    protected _getMaxMiplevel(size: number): number;
    protected _getMipmapCount(): number;
    /**
     * Get detailed texture detail information based on texture format.
     * @param format Texture format.
     * @param gl WebGLRenderingContext.
     * @returns Texture format detail.
     */
    static _getFormatDetail(format: TextureFormat, gl: WebGLRenderingContext): TextureFormatDetail;
}
