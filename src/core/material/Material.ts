import { Engine } from '../Engine';
import { Shader, ShaderData, ShaderDataGroup } from '../shader';

/**
 * Material base class.
 */
export class Material {
  /** Name. */
  name: string;
  /** Shader used by the material. */
  shader: Shader;
  // TODO: 提升一个RefObject!
  engine: Engine;

  /** Shader data. */
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Material);

  constructor(engine: Engine, shader: Shader) {
    this.shader = shader;
    this.engine = engine;
  }
}
