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
  faceInfoArr: IFaceInfo[];
  /** Get the sampler for the cube texture in the shader. */
  static _skyboxprop = Shader.getPropertyByName('u_Skybox');

  // TODO: 抽RefObject
  constructor(engine: Engine, faceInfoArr: IFaceInfo[]) {
    super(engine, Shader.find('skybox'));

    const shaderData = this.shaderData;
    this.textureCube = new TextureCube(engine, 1024);
    this.faceInfoArr = faceInfoArr;
    const gl = engine.gl;

    this.faceInfoArr.forEach((faceInfo) => {
      const { target, url } = faceInfo;
      const level = 0;

      const image = new Image();
      image.src = url;
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        this.textureCube.setImageSource(target, image, level, false, false, 0, 0);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      };
    });

    shaderData.setTexture(SkyBoxMaterial._skyboxprop, this.textureCube);
  }
}
