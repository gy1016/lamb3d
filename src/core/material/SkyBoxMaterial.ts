import { Engine } from '../Engine';
import { Shader } from '../shader';
import { Material } from './Material';

export class SkyBoxMaterial extends Material {
  constructor(engine: Engine, shader: Shader) {
    super(engine, shader);
  }
}
