export enum MeshType {
  ModelMesh = 1,
  PrimitiveMesh,
}

export class BaseMesh {
  public meshType: MeshType;

  constructor(type: MeshType) {
    this.meshType = type;
  }
}
