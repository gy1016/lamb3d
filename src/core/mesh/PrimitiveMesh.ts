import { Vector2, Vector3 } from '../../math';
import { ModelMesh } from './ModelMesh';

export class PrimitiveMesh {
  /**
   * Create a cuboid mesh.
   * @param width - Cuboid width
   * @param height - Cuboid height
   * @param depth - Cuboid depth
   * @param noLongerAccessible - No longer access the vertices of the mesh after creation
   * @returns Cuboid model mesh
   */
  static createCuboid(
    width: number = 1,
    height: number = 1,
    depth: number = 1,
    noLongerAccessible: boolean = true,
  ): ModelMesh {
    const mesh = new ModelMesh('Cuboid');

    const halfWidth: number = width / 2;
    const halfHeight: number = height / 2;
    const halfDepth: number = depth / 2;

    const positions: Vector3[] = new Array(24);
    const normals: Vector3[] = new Array(24);
    const uvs: Vector2[] = new Array(24);

    // Up
    positions[0] = new Vector3(-halfWidth, halfHeight, -halfDepth);
    positions[1] = new Vector3(halfWidth, halfHeight, -halfDepth);
    positions[2] = new Vector3(halfWidth, halfHeight, halfDepth);
    positions[3] = new Vector3(-halfWidth, halfHeight, halfDepth);
    normals[0] = new Vector3(0, 1, 0);
    normals[1] = new Vector3(0, 1, 0);
    normals[2] = new Vector3(0, 1, 0);
    normals[3] = new Vector3(0, 1, 0);
    uvs[0] = new Vector2(0, 0);
    uvs[1] = new Vector2(1, 0);
    uvs[2] = new Vector2(1, 1);
    uvs[3] = new Vector2(0, 1);
    // Down
    positions[4] = new Vector3(-halfWidth, -halfHeight, -halfDepth);
    positions[5] = new Vector3(halfWidth, -halfHeight, -halfDepth);
    positions[6] = new Vector3(halfWidth, -halfHeight, halfDepth);
    positions[7] = new Vector3(-halfWidth, -halfHeight, halfDepth);
    normals[4] = new Vector3(0, -1, 0);
    normals[5] = new Vector3(0, -1, 0);
    normals[6] = new Vector3(0, -1, 0);
    normals[7] = new Vector3(0, -1, 0);
    uvs[4] = new Vector2(0, 1);
    uvs[5] = new Vector2(1, 1);
    uvs[6] = new Vector2(1, 0);
    uvs[7] = new Vector2(0, 0);
    // Left
    positions[8] = new Vector3(-halfWidth, halfHeight, -halfDepth);
    positions[9] = new Vector3(-halfWidth, halfHeight, halfDepth);
    positions[10] = new Vector3(-halfWidth, -halfHeight, halfDepth);
    positions[11] = new Vector3(-halfWidth, -halfHeight, -halfDepth);
    normals[8] = new Vector3(-1, 0, 0);
    normals[9] = new Vector3(-1, 0, 0);
    normals[10] = new Vector3(-1, 0, 0);
    normals[11] = new Vector3(-1, 0, 0);
    uvs[8] = new Vector2(0, 0);
    uvs[9] = new Vector2(1, 0);
    uvs[10] = new Vector2(1, 1);
    uvs[11] = new Vector2(0, 1);
    // Right
    positions[12] = new Vector3(halfWidth, halfHeight, -halfDepth);
    positions[13] = new Vector3(halfWidth, halfHeight, halfDepth);
    positions[14] = new Vector3(halfWidth, -halfHeight, halfDepth);
    positions[15] = new Vector3(halfWidth, -halfHeight, -halfDepth);
    normals[12] = new Vector3(1, 0, 0);
    normals[13] = new Vector3(1, 0, 0);
    normals[14] = new Vector3(1, 0, 0);
    normals[15] = new Vector3(1, 0, 0);
    uvs[12] = new Vector2(1, 0);
    uvs[13] = new Vector2(0, 0);
    uvs[14] = new Vector2(0, 1);
    uvs[15] = new Vector2(1, 1);
    // Front
    positions[16] = new Vector3(-halfWidth, halfHeight, halfDepth);
    positions[17] = new Vector3(halfWidth, halfHeight, halfDepth);
    positions[18] = new Vector3(halfWidth, -halfHeight, halfDepth);
    positions[19] = new Vector3(-halfWidth, -halfHeight, halfDepth);
    normals[16] = new Vector3(0, 0, 1);
    normals[17] = new Vector3(0, 0, 1);
    normals[18] = new Vector3(0, 0, 1);
    normals[19] = new Vector3(0, 0, 1);
    uvs[16] = new Vector2(0, 0);
    uvs[17] = new Vector2(1, 0);
    uvs[18] = new Vector2(1, 1);
    uvs[19] = new Vector2(0, 1);
    // Back
    positions[20] = new Vector3(-halfWidth, halfHeight, -halfDepth);
    positions[21] = new Vector3(halfWidth, halfHeight, -halfDepth);
    positions[22] = new Vector3(halfWidth, -halfHeight, -halfDepth);
    positions[23] = new Vector3(-halfWidth, -halfHeight, -halfDepth);
    normals[20] = new Vector3(0, 0, -1);
    normals[21] = new Vector3(0, 0, -1);
    normals[22] = new Vector3(0, 0, -1);
    normals[23] = new Vector3(0, 0, -1);
    uvs[20] = new Vector2(1, 0);
    uvs[21] = new Vector2(0, 0);
    uvs[22] = new Vector2(0, 1);
    uvs[23] = new Vector2(1, 1);

    const indices = new Uint16Array(36);

    // prettier-ignore
    // Up
    indices[0] = 0, indices[1] = 2, indices[2] = 1, indices[3] = 2, indices[4] = 0, indices[5] = 3,
    // Down
    indices[6] = 4, indices[7] = 6, indices[8] = 7, indices[9] = 6, indices[10] = 4, indices[11] = 5,
    // Left
    indices[12] = 8, indices[13] = 10, indices[14] = 9, indices[15] = 10, indices[16] = 8, indices[17] = 11,
    // Right
    indices[18] = 12, indices[19] = 14, indices[20] = 15, indices[21] = 14, indices[22] = 12, indices[23] = 13,
    // Front
    indices[24] = 16, indices[25] = 18, indices[26] = 17, indices[27] = 18, indices[28] = 16, indices[29] = 19,
    // Back
    indices[30] = 20, indices[31] = 22, indices[32] = 23, indices[33] = 22, indices[34] = 20, indices[35] = 21;

    PrimitiveMesh._initialize(mesh, positions, normals, uvs, indices);
    return mesh;
  }

  /**
   * According a series of data ti initialize mesh
   * @param mesh object's mesh
   * @param positions object's position array
   * @param normals object's normals array
   * @param uv object's uv array
   * @param indices object's indices array
   */
  private static _initialize(
    mesh: ModelMesh,
    positions: Vector3[],
    normals: Vector3[],
    uvs: Vector2[],
    indices: Uint16Array | Uint32Array,
  ) {
    mesh.setPositions(positions);
    mesh.setNormals(normals);
    mesh.setUVs(uvs);
    mesh.setIndices(indices);
  }
}
