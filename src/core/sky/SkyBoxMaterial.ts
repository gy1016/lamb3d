import { Engine } from '../Engine';
import { Material } from '../material';
import { Shader } from '../shader';
import { TextureCube } from '../texture/TextureCube';

export class SkyBoxMaterial extends Material {
  textureCube: TextureCube;

  constructor(engine: Engine) {
    super(engine, Shader.find('skybox'));
    this.textureCube = new TextureCube(engine, 1024);

    const gl = engine.gl;
    const faceInfos = [
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_mx.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_px.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_py.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_my.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_mz.jpg',
      },
      {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_pz.jpg',
      },
    ];

    faceInfos.forEach((faceInfo) => {
      const { target, url } = faceInfo;
      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 1024;
      const height = 1024;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;
      gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

      const image = new Image();
      image.src = url;
      image.onload = () => {
        this.textureCube.setImageSource(target, image, level, false, false, 0, 0);
      };
    });

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  }

  private loadSkyBoxTexture(urls: string[]): any {
    const imgsArr = urls.map((url) => {
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
    });

    // TODO: 可能会失败，失败的结果类型我该怎么考虑呢？
    return Promise.all(imgsArr);
  }
}
