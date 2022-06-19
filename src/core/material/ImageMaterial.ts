import { Engine } from '../Engine';
import { Shader } from '../shader';
import { Texture2D, TextureFormat } from '../texture';
import { Material } from './Material';

const defaultUrl = `http://121.199.160.202/images/earth.jpg`;

export class ImageMaterial extends Material {
  constructor(engine: Engine, shader: Shader, url: string = defaultUrl) {
    super(engine, shader);

    const shaderData = this.shaderData;
    this.loadEarthTexture(url)
      .then((image) => {
        this.texture2d = new Texture2D(engine, image.width, image.height, TextureFormat.R8G8B8, false);
        this.texture2d.setImageSource(image, 0, false, false, 0, 0);
        shaderData.setTexture(Material._sampleprop, this.texture2d);
      })
      .catch((error) => {
        throw error;
      });
  }

  private loadEarthTexture(url: string): Promise<HTMLImageElement> {
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
