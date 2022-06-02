import { TextureFilterMode } from './enums/TextureFilterMode';
import { TextureFormat } from './enums/TextureFormat';
import { TextureWrapMode } from './enums/TextureWrapMode';

export abstract class Texture {
  name: string;

  _mipmap: boolean;
  _glTexture: WebGLTexture;
  _glTarget: number;

  protected _format: TextureFormat;
  protected _width: number;
  protected _height: number;
  protected _mipmapCount: number;

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
}
