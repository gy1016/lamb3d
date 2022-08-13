import { Engine } from '../Engine';
import { Material } from '../material';
import { Shader } from '../shader';
import { TextureCube } from '../texture/TextureCube';

export class SkyBoxMaterial extends Material {
  textureCube: TextureCube;

  constructor(engine: Engine) {
    super(engine, Shader.find('skybox'));

    const shaderData = this.shaderData;
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

      const image = new Image();
      image.src = url;
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        this.textureCube.setImageSource(target, image, level, false, false, 0, 0);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      };
    });

    // ! 感觉问题在这！！！！！！也不对啊。。毕竟他是引用类型
    shaderData.setTexture(Material._skyboxprop, this.textureCube);
  }
}
