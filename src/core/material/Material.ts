import { Shader } from '../shader';

export class Material {
  name: string;
  shader: Shader;

  constructor(name: string, vertexSource: string, fragmentSource: string) {
    this.name = name;
    this.shader = Shader.create(name, vertexSource, fragmentSource);
  }
}
