import { Engine } from '../Engine';
import { TextureFilterMode } from './enums/TextureFilterMode';
import { TextureFormat } from './enums/TextureFormat';
import { TextureWrapMode } from './enums/TextureWrapMode';
import { Texture } from './Texture';

/**
 * Cube texture.
 */
export class TextureCube extends Texture {
  /**
   * Create TextureCube.
   * @param engine Define the engine to use to render this texture.
   * @param size Texture size. texture width must be equal to height in cube texture.
   * @param format Texture format,default TextureFormat.R8G8B8A8.
   * @param mipmap Whether to use multi-level texture.
   */
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
    this._glTarget = this._gl.TEXTURE_CUBE_MAP;
    this._formatDetail = Texture._getFormatDetail(format, this._gl);
  }

  /**
   * Set texture based on pixel buffer.
   * @param face Which side of the cube.
   * @param colorBuffer Color buffer.
   * @param mipLevel Mip level.
   */
  setPixelBuffer(
    face: number,
    colorBuffer: ArrayBufferView,
    mipLevel: number = 0,
    // x: number = 0,
    // y: number = 0,
    // width?: number,
    // height?: number,
  ): void {
    const gl = this._gl;
    const { internalFormat, baseFormat, dataType } = this._formatDetail;

    gl.bindTexture(this._glTarget, this._glTexture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);

    gl.texImage2D(
      gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
      mipLevel,
      internalFormat,
      this._width,
      this._height,
      0,
      baseFormat,
      dataType,
      colorBuffer,
    );
  }

  /**
   * Set the texture according to the picture.
   * @param face Which side of the cube.
   * @param imageSource Image source.
   * @param mipLevel Mip level.
   */
  setImageSource(
    face: number,
    imageSource: TexImageSource | null,
    mipLevel: number,
    // flipY: boolean,
    // premultiplyAlpha: boolean,
    // x: number,
    // y: number,
  ): void {
    const gl = this._gl;
    const { baseFormat, dataType, internalFormat } = this._formatDetail;
    gl.bindTexture(this._glTarget, this._glTexture);
    gl.texImage2D(face, mipLevel, internalFormat, baseFormat, dataType, imageSource);
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
  }
}
