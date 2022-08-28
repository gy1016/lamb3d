import { Engine } from '../Engine';
import { TextureFormat } from './enums/TextureFormat';
import { Texture } from './Texture';
/**
 * Two-dimensional texture.
 */
export declare class Texture2D extends Texture {
    /**
     * Create Texture2D.
     * @param engine Define the engine to use to render this texture.
     * @param width Texture width.
     * @param height Texture height.
     * @param format Texture format. default  `TextureFormat.R8G8B8A8`.
     * @param mipmap Whether to use multi-level texture.
     */
    constructor(engine: Engine, width: number, height: number, format?: TextureFormat, mipmap?: boolean);
    /**
     * Set texture based on pixel buffer.
     * @param colorBuffer Color buffer array.
     * @param mipLevel Mip level.
     * @param x Starting point x position.
     * @param y Starting point y position.
     * @param width Set width.
     * @param height Set height.
     */
    setPixelBuffer(colorBuffer: ArrayBufferView, mipLevel?: number, x?: number, y?: number, width?: number, height?: number): void;
    /**
     * Set the texture according to the picture.
     * @param imageSource Image source.
     * @param mipLevel Mip level.
     * @param flipY Y axis reversed.
     */
    setImageSource(imageSource: TexImageSource, mipLevel: number, flipY: boolean): void;
}
