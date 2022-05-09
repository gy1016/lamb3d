import { Shader } from '../shader';

export class Material {
  name: string;
  shader: Shader;

  constructor(name: string, shader: Shader) {
    this.name = name;
    this.shader = shader;
  }
}
