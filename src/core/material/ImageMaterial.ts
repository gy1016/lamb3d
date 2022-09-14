import { Engine } from '../Engine';
import { Shader } from '../shader';
import { Texture2D, TextureFormat } from '../texture';
import { Material } from './Material';

/**
 * Image materials using 2D textures to display the earth, raster tiles, etc.
 */
export class ImageMaterial extends Material {
  /** The texture used by the image material. */
  texture2d: Texture2D;
  /** The address of the texture sampler in the shader. */
  static _sampleprop = Shader.getPropertyByName('u_sampler');

  // TODO: 应该建立一个shader池，这样就不用再传入shader了
  constructor(engine: Engine, shader: Shader, url: string) {
    super(engine, shader);

    const shaderData = this.shaderData;
    this.loadTexture(url)
      .then((image) => {
        this.texture2d = new Texture2D(engine, image.width, image.height, TextureFormat.R8G8B8, false);
        this.texture2d.setImageSource(image, 0, false);
        shaderData.setTexture(ImageMaterial._sampleprop, this.texture2d);
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Load texture image according to url.
   * @param url Texture image url.
   * @returns Promise<HTMLImageElement>
   */
  private loadTexture(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      let image: HTMLImageElement = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.src = url;
      image.crossOrigin = 'anonymous';
    });
  }
}
