import { Engine } from '../Engine';
import { TextureFormat } from './enums/TextureFormat';
import { Texture } from './Texture';
/**
 * Cube texture.
 */
export declare class TextureCube extends Texture {
    /**
     * Create TextureCube.
     * @param engine Define the engine to use to render this texture.
     * @param size Texture size. texture width must be equal to height in cube texture.
     * @param format Texture format,default TextureFormat.R8G8B8A8.
     * @param mipmap Whether to use multi-level texture.
     */
    constructor(engine: Engine, size: number, format?: TextureFormat, mipmap?: boolean);
    /**
     * Set texture based on pixel buffer.
     * @param face Which side of the cube.
     * @param colorBuffer Color buffer.
     * @param mipLevel Mip level.
     */
    setPixelBuffer(face: number, colorBuffer: ArrayBufferView, mipLevel?: number): void;
    /**
     * Set the texture according to the picture.
     * @param face Which side of the cube.
     * @param imageSource Image source.
     * @param mipLevel Mip level.
     */
    setImageSource(face: number, imageSource: TexImageSource | null, mipLevel: number): void;
}
