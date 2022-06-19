import { Engine } from '../Engine';
import { Shader, ShaderData, ShaderDataGroup } from '../shader';
import { Texture2D, TextureFormat } from '../texture';

export class Material {
  /** Name. */
  name: string;
  /** Shader used by the material. */
  shader: Shader;
  texture2d: Texture2D;
  engine: Engine;

  /** Shader data. */
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Material);

  protected static _sampleprop = Shader.getPropertyByName('u_Sampler');

  constructor(engine: Engine, shader: Shader) {
    this.shader = shader;
    this.engine = engine;
  }
}
