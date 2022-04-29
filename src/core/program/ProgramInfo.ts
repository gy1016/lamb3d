import { AttributesInfo } from './AttributesInfo';
import { UniformsInfo } from './UniformsInfo';

export class ProgramInfo {
  // this program is WebGLProgram or Program?
  program: WebGLProgram;
  attribLocations: AttributesInfo;
  uniformLocations: UniformsInfo;

  constructor(program: WebGLProgram, attribLocations: AttributesInfo, uniformLocations: UniformsInfo) {
    this.program = program;
    this.attribLocations = attribLocations;
    this.uniformLocations = uniformLocations;
  }
}
