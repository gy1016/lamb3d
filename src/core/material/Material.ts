import { Shader } from '../shader';

export class Material {
  /** Name. */
  name: string;
  /** Shader used by the material. */
  shader: Shader;

  constructor(name: string, shader: Shader) {
    this.name = name;
    this.shader = shader;
  }
}
