import { Engine } from '../Engine';
import { TextureFilterMode } from './enums/TextureFilterMode';
import { TextureFormat } from './enums/TextureFormat';
import { TextureWrapMode } from './enums/TextureWrapMode';
import { Texture } from './Texture';

export class Texture2D extends Texture {
  private _gl: WebGLRenderingContext;

  constructor(
    engine: Engine,
    width: number,
    height: number,
    format: TextureFormat = TextureFormat.R8G8B8A8,
    mipmap: boolean = true,
  ) {
    super();
    this._mipmap = mipmap;
    this._width = width;
    this._height = height;
    this._format = format;
    this._mipmapCount = this._getMipmapCount();

    this.filterMode = TextureFilterMode.Bilinear;
    this.wrapModeU = this.wrapModeV = TextureWrapMode.Repeat;

    this._gl = engine.gl;
    this._glTexture = this._gl.createTexture();
    this._glTarget = this._gl.TEXTURE_2D;
  }

  setPixelBuffer(
    colorBuffer: ArrayBufferView,
    mipLevel: number = 0,
    x: number = 0,
    y: number = 0,
    width?: number,
    height?: number,
  ): void {
    const gl = this._gl;
    const format = this._format;

    const mipWidth = Math.max(1, this._width >> mipLevel);
    const mipHeight = Math.max(1, this.height >> mipLevel);

    width = width || mipWidth - x;
    height = height || mipHeight - y;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    // 这里我直接把数据的type写死了，待考虑！！
    gl.texSubImage2D(this._glTarget, mipLevel, x, y, width, height, format, gl.UNSIGNED_BYTE, colorBuffer);
  }
}
