import skyboxFs from '../shaderlib/extra/skybox.fs.glsl';
import skyboxVs from '../shaderlib/extra/skybox.vs.glsl';
import { Shader } from './Shader';

export class ShaderPool {
  static init(): void {
    Shader.create('skybox', skyboxVs, skyboxFs);
  }
}
