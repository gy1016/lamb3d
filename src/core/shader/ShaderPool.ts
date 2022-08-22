import skyboxFs from '../shaderlib/extra/skybox.fs.glsl';
import skyboxVs from '../shaderlib/extra/skybox.vs.glsl';
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
  }
}
