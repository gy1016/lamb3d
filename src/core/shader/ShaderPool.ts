import skyboxFs from '../shaderlib/extra/skybox.fs.glsl';
import skyboxVs from '../shaderlib/extra/skybox.vs.glsl';
import commonFs from '../shaderlib/common.fs.glsl';
import commonVs from '../shaderlib/common.vs.glsl';
import { Shader } from './Shader';

/**
 * Engine built-in shader pool.
 */
export class ShaderPool {
  /**
   * Created by Shader based on fragment and vertex shader code.
   */
  static init(): void {
    Shader.create('skybox', skyboxVs, skyboxFs);
    Shader.create('common', commonVs, commonFs);
  }
}
