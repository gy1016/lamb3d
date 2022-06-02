import { Engine } from '../Engine';
import { Shader, ShaderData, ShaderDataGroup } from '../shader';
import { Texture2D, TextureFormat } from '../texture';

export class Material {
  /** Name. */
  name: string;
  /** Shader used by the material. */
  shader: Shader;
  _earthTexture2D: Texture2D;

  /** Shader data. */
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Material);

  private static _sampleprop = Shader.getPropertyByName('u_Sampler');

  constructor(engine: Engine, shader: Shader) {
    this.shader = shader;

    const shaderData = this.shaderData;
    const url = `https://121.199.160.202/images/earth.jpg`;
    this.loadEarthTexture(url)
      .then((image) => {
        debugger;
        console.log(image);
        this._earthTexture2D = new Texture2D(engine, image.width, image.height, TextureFormat.R8G8B8, false);
        this._earthTexture2D.setImageSource(image, 0, true, false, 0, 0);
        shaderData.setTexture(Material._sampleprop, this._earthTexture2D);
      })
      .catch((err) => {
        throw err;
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
    });
  }
}
