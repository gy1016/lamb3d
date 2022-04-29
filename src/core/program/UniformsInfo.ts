export enum UTypeEnumn {
  Mat4 = 'uniformMatrix4fv',
  Mat3 = 'uniformMatrix3fv',
  Vec4 = 'uniform4fv',
  Vec3 = 'uniform3fv',
  Vec2 = 'uniform2fv',
  float = 'uniform1f',
  texture = 'uniform1i',
  vec2i = 'uniform2iv',
  vec3i = 'uniform3iv',
  vec4i = 'uniform4iv',
}

export class UniTypeInfo {
  loc: number | null;
  utype: UTypeEnumn;
  value: null;

  constructor(loc: number, utype: UTypeEnumn) {
    this.loc = loc;
    this.utype = utype;
    this.value = null;
  }
}

export class UniformsInfo {
  projectionMatrix: UniTypeInfo;
  modelViewMatrix: UniTypeInfo;

  constructor() {
    this.projectionMatrix = new UniTypeInfo(null, UTypeEnumn.Mat4);
    this.modelViewMatrix = new UniTypeInfo(null, UTypeEnumn.Mat4);
  }
}
