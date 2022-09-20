import { Engine } from '../Engine';
import { Material } from '../material';
import { Shader } from '../shader';
import { TextureCube } from '../texture/TextureCube';

type IFaceInfo = {
  target: number;
  url: string;
};

/**
 * A skybox material built with a cube texture, used to display the starry sky, etc.
 */
export class SkyBoxMaterial extends Material {
  /** Cube texture. */
  textureCube: TextureCube;
  /** Six sided information array. */
  faceInfos: IFaceInfo[];
  /** Get the sampler for the cube texture in the shader. */
  static _skyboxprop = Shader.getPropertyByName('u_Skybox');

  // TODO: 抽RefObject
  constructor(engine: Engine, faceInfos: IFaceInfo[]) {
    super(engine, Shader.find('skybox'));

    this.faceInfos = faceInfos;

    this.initCubeMap(engine);
  }

  /**
   * According image url load image.
   * @param url Image url.
   * @returns Success return html image element, otherwise return error message.
   */
  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (err) => {
        reject(err);
      };
    });
  }

  /**
   * Set cube image source when image success load.
   */
  private initCubeMap(engine: Engine) {
    const faceInfos = this.faceInfos;
    const n = faceInfos.length;
    let promises: Promise<HTMLImageElement>[] = [];

    for (let i = 0; i < n; ++i) {
      const { url } = this.faceInfos[i];
      promises.push(this.loadImage(url));
    }

    Promise.all(promises).then((images) => {
      this.textureCube = new TextureCube(this.engine, images[0].width);
      this.shaderData.setTexture(SkyBoxMaterial._skyboxprop, this.textureCube);

      this.textureCube.setImageSource(faceInfos[0].target, images[0], 0);
      this.textureCube.setImageSource(faceInfos[1].target, images[1], 0);
      this.textureCube.setImageSource(faceInfos[2].target, images[2], 0);
      this.textureCube.setImageSource(faceInfos[3].target, images[3], 0);
      this.textureCube.setImageSource(faceInfos[4].target, images[4], 0);
      this.textureCube.setImageSource(faceInfos[5].target, images[5], 0);

      const gl = engine.gl;
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    });
  }
}
