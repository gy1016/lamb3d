import { Engine } from '../Engine';
import { Shader, ShaderData, ShaderDataGroup } from '../shader';

export class Material {
  /** Name. */
  name: string;
  /** Shader used by the material. */
  shader: Shader;
  engine: Engine;

  /** Shader data. */
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Material);

  // TODO: 这个应该放到2D纹理里面
  protected static _sampleprop = Shader.getPropertyByName('u_Sampler');
  // TODO: 这个可能要放到3D纹理里面，其实不放也不碍事
  protected static _skyboxprop = Shader.getPropertyByName('u_Skybox');

  constructor(engine: Engine, shader: Shader) {
    this.shader = shader;
    this.engine = engine;
  }
}
