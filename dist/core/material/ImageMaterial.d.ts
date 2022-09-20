import { Engine } from '../Engine';
import { Shader } from '../shader';
import { Texture2D } from '../texture';
import { Material } from './Material';
/**
 * Image materials using 2D textures to display the earth, raster tiles, etc.
 */
export declare class ImageMaterial extends Material {
    /** The texture used by the image material. */
    texture2d: Texture2D;
    /** The address of the texture sampler in the shader. */
    static _sampleprop: import("../shader").ShaderProperty;
    constructor(engine: Engine, shader: Shader, url: string);
    /**
     * Load texture image according to url.
     * @param url Texture image url.
     * @returns Promise<HTMLImageElement>
     */
    private loadTexture;
}
