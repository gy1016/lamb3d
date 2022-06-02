import { Shader, ShaderData, ShaderDataGroup } from '../shader';

export class Material {
  /** Name. */
  name: string;
  /** Shader used by the material. */
  shader: Shader;
  /** Shader data. */
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Material);
  private static _sampleprop = Shader.getPropertyByName('u_Sampler');

  constructor(name: string, shader: Shader) {
    this.name = name;
    this.shader = shader;
    const shaderData = this.shaderData;

    shaderData.setTexture(Material._sampleprop);
  }
}
