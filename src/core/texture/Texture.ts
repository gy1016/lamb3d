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
  // webgl2才开启纹理压缩
  /** Whether texture compression. */
  isCompressed: boolean;
}

/**
 * The base class of texture, contains some common functions of texture-related classes.
 */
export abstract class Texture {
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

  private _wrapModeU: TextureWrapMode;
  private _wrapModeV: TextureWrapMode;
  private _filterMode: TextureFilterMode;

  get format(): TextureFormat {
    return this._format;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get wrapModeU(): TextureWrapMode {
    return this._wrapModeU;
  }

  set wrapModeU(value: TextureWrapMode) {
    if (value === this._wrapModeU) return;
    this._wrapModeU = value;
  }

  get wrapModeV(): TextureWrapMode {
    return this._wrapModeV;
  }

  set wrapModeV(value: TextureWrapMode) {
    if (value === this._wrapModeV) return;
    this._wrapModeV = value;
  }

  get mipmapCount(): number {
    return this._mipmapCount;
  }

  get filterMode(): TextureFilterMode {
    return this._filterMode;
  }

  set filterMode(value: TextureFilterMode) {
    if (value === this._filterMode) return;
    this._filterMode = value;
  }

  protected _getMaxMiplevel(size: number): number {
    return Math.floor(Math.log2(size));
  }

  protected _getMipmapCount(): number {
    return this._mipmap ? Math.floor(Math.log2(Math.max(this._width, this._height))) + 1 : 1;
  }

  /**
   * Get detailed texture detail information based on texture format.
   * @param format Texture format.
   * @param gl WebGLRenderingContext.
   * @returns Texture format detail.
   */
  static _getFormatDetail(format: TextureFormat, gl: WebGLRenderingContext): TextureFormatDetail {
    switch (format) {
      case TextureFormat.R8G8B8:
        return {
          internalFormat: gl.RGB,
          baseFormat: gl.RGB,
          dataType: gl.UNSIGNED_BYTE,
          isCompressed: false,
        };
      case TextureFormat.R8G8B8A8:
        return {
          internalFormat: gl.RGBA,
          baseFormat: gl.RGBA,
          dataType: gl.UNSIGNED_BYTE,
          isCompressed: false,
        };
      case TextureFormat.R4G4B4A4:
        return {
          internalFormat: gl.RGBA,
          baseFormat: gl.RGBA,
          dataType: gl.UNSIGNED_SHORT_4_4_4_4,
          isCompressed: false,
        };
      case TextureFormat.R5G5B5A1:
        return {
          internalFormat: gl.RGBA,
          baseFormat: gl.RGBA,
          dataType: gl.UNSIGNED_SHORT_5_5_5_1,
          isCompressed: false,
        };
      case TextureFormat.R5G6B5:
        return {
          internalFormat: gl.RGB,
          baseFormat: gl.RGB,
          dataType: gl.UNSIGNED_SHORT_5_6_5,
          isCompressed: false,
        };
      case TextureFormat.Alpha8:
        return {
          internalFormat: gl.ALPHA,
          baseFormat: gl.ALPHA,
          dataType: gl.UNSIGNED_BYTE,
          isCompressed: false,
        };
      case TextureFormat.LuminanceAlpha:
        return {
          internalFormat: gl.LUMINANCE_ALPHA,
          baseFormat: gl.LUMINANCE_ALPHA,
          dataType: gl.UNSIGNED_BYTE,
          isCompressed: false,
        };
      default:
        throw new Error(`this TextureFormat is not supported in Oasis Engine: ${format}`);
    }
  }
}
