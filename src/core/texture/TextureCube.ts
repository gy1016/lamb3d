import { Engine } from '../Engine';
import { TextureFilterMode } from './enums/TextureFilterMode';
import { TextureFormat } from './enums/TextureFormat';
import { TextureWrapMode } from './enums/TextureWrapMode';
import { Texture } from './Texture';

export class TextureCube extends Texture {
  constructor(engine: Engine, size: number, format: TextureFormat = TextureFormat.R8G8B8A8, mipmap: boolean = true) {
    super();

    this._mipmap = mipmap;
    this._width = size;
    this._height = size;
    this._format = format;
    this._mipmapCount = this._getMipmapCount();

    this.filterMode = TextureFilterMode.Bilinear;
    this.wrapModeU = this.wrapModeV = TextureWrapMode.Clamp;

    this._gl = engine.gl;
    this._glTexture = this._gl.createTexture();
    this._glTarget = this._gl.TEXTURE_2D;
    this._formatDetail = Texture._getFormatDetail(format, this._gl);
  }

  setPixelBuffer() {}

  setImageSource() {}
}
