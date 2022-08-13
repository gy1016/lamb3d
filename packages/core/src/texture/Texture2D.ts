import { Engine } from '../Engine';
import { TextureFilterMode } from './enums/TextureFilterMode';
import { TextureFormat } from './enums/TextureFormat';
import { TextureWrapMode } from './enums/TextureWrapMode';
import { Texture } from './Texture';

export class Texture2D extends Texture {
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
    this._formatDetail = Texture._getFormatDetail(format, this._gl);
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
    const { internalFormat, baseFormat, dataType, isCompressed } = this._formatDetail;
    const mipWidth = Math.max(1, this._width >> mipLevel);
    const mipHeight = Math.max(1, this.height >> mipLevel);

    width = width || mipWidth - x;
    height = height || mipHeight - y;

    gl.bindTexture(this._glTarget, this._glTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texParameteri(this._glTarget, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // gl.texSubImage2D(this._glTarget, mipLevel, x, y, width, height, baseFormat, dataType, colorBuffer);
    gl.texImage2D(this._glTarget, mipLevel, internalFormat, width, height, 0, baseFormat, dataType, colorBuffer);
  }

  setImageSource(
    imageSource: TexImageSource,
    mipLevel: number,
    flipY: boolean,
    premultiplyAlpha: boolean,
    x: number = 0,
    y: number = 0,
  ): void {
    const gl = this._gl;
    const { baseFormat, dataType, internalFormat } = this._formatDetail;

    gl.bindTexture(this._glTarget, this._glTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, +flipY);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, +premultiplyAlpha);
    // gl.texSubImage2D(this._glTarget, mipLevel, x || 0, y || 0, baseFormat, dataType, imageSource);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(this._glTarget, mipLevel, internalFormat, baseFormat, dataType, imageSource);
  }
}
