import { Engine } from '../Engine';
import { Material } from '../material';
import { Shader } from '../shader';
import { TextureCube } from '../texture/TextureCube';

export class SkyBoxMaterial extends Material {
  constructor(engine: Engine) {
    super(engine, Shader.find('skybox'));
  }

  get textureCubeMap(): TextureCube {
    return this.shaderData.getTexture('u_cube') as TextureCube;
  }

  set textureCubeMap(v: TextureCube) {
    this.shaderData.setTexture('u_cube', v);
  }
}
