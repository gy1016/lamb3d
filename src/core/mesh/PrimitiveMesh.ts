import { Vector2, Vector3 } from '../../math';
import { ModelMesh } from './ModelMesh';
import { Engine } from '../Engine';

export class PrimitiveMesh {
  /**
   * Create a cuboid mesh.
   * @param width - Cuboid width
   * @param height - Cuboid height
   * @param depth - Cuboid depth
   * @returns Cuboid model mesh
   */
  static createCuboid(engine: Engine, width: number = 1, height: number = 1, depth: number = 1): ModelMesh {
    const gl = engine.gl;
    const mesh = new ModelMesh(gl, 'Cuboid');

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
   *
   * @param engine 引擎实例
   * @param level 正四面体递归切分等级
   * @returns 球网格实例
   */
  static createSphereBySliceTetrahedron(engine: Engine, level = 0): ModelMesh {
    const gl = engine.gl;
    const mesh = new ModelMesh(gl, 'Sphere');

    const negativeRootTwoOverThree = -Math.sqrt(2.0) / 3.0;
    const negativeOneThird = -1.0 / 3.0;
    const rootSixOverThree = Math.sqrt(6.0) / 3.0;

    const positions: Vector3[] = [];
    positions.push(new Vector3(0, 0, 1));
    positions.push(new Vector3(0, (2 * Math.sqrt(2)) / 3, negativeOneThird));
    positions.push(new Vector3(-rootSixOverThree, negativeRootTwoOverThree, negativeOneThird));
    positions.push(new Vector3(rootSixOverThree, negativeRootTwoOverThree, negativeOneThird));

    let indices: any = [];
    PrimitiveMesh.subdivide(positions, indices, [0, 1, 2], level);
    PrimitiveMesh.subdivide(positions, indices, [0, 2, 3], level);
    PrimitiveMesh.subdivide(positions, indices, [0, 3, 1], level);
    PrimitiveMesh.subdivide(positions, indices, [1, 3, 2], level);

    indices = new Uint16Array(indices);

    PrimitiveMesh._initialize(mesh, positions, null, null, indices);
    return mesh;
  }

  /**
   * Create a sphere mesh.
   * @param engine - Engine
   * @param radius - Sphere radius
   * @param segments - Number of segments
   * @returns Sphere model mesh
   */
  static createSphereByParamEquation(engine: Engine, radius: number = 0.5, segments: number = 18): ModelMesh {
    const mesh = new ModelMesh(engine.gl);
    segments = Math.max(2, Math.floor(segments));

    const count = segments + 1;
    const vertexCount = count * count;
    const rectangleCount = segments * segments;
    const indices = new Uint16Array(rectangleCount * 6);
    const thetaRange = Math.PI;
    const alphaRange = thetaRange * 2;
    const countReciprocal = 1.0 / count;
    const segmentsReciprocal = 1.0 / segments;

    const positions: Vector3[] = new Array(vertexCount);
    const normals: Vector3[] = new Array(vertexCount);
    const uvs: Vector2[] = new Array(vertexCount);

    for (let i = 0; i < vertexCount; ++i) {
      const x = i % count;
      const y = (i * countReciprocal) | 0;
      const u = x * segmentsReciprocal;
      const v = y * segmentsReciprocal;
      const alphaDelta = u * alphaRange;
      const thetaDelta = v * thetaRange;
      const sinTheta = Math.sin(thetaDelta);

      let posX = -radius * Math.cos(alphaDelta) * sinTheta;
      let posY = radius * Math.cos(thetaDelta);
      let posZ = radius * Math.sin(alphaDelta) * sinTheta;

      // Position
      positions[i] = new Vector3(posX, posY, posZ);
      // Normal
      normals[i] = new Vector3(posX, posY, posZ);
      // Texcoord
      uvs[i] = new Vector2(u, v);
    }

    let offset = 0;
    for (let i = 0; i < rectangleCount; ++i) {
      const x = i % segments;
      const y = (i * segmentsReciprocal) | 0;

      const a = y * count + x;
      const b = a + 1;
      const c = a + count;
      const d = c + 1;

      indices[offset++] = b;
      indices[offset++] = a;
      indices[offset++] = d;
      indices[offset++] = a;
      indices[offset++] = c;
      indices[offset++] = d;
    }

    PrimitiveMesh._initialize(mesh, positions, normals, uvs, indices);
    return mesh;
  }

  static subdivide(positions: Vector3[], indices: number[], triangle: [number, number, number], level = 0) {
    if (level > 0) {
      let tmp1 = new Vector3();
      let tmp2 = new Vector3();
      let tmp3 = new Vector3();

      Vector3.add(positions[triangle[0]], positions[triangle[1]], tmp1);
      Vector3.scale(tmp1, 0.5, tmp1);
      Vector3.add(positions[triangle[1]], positions[triangle[2]], tmp2);
      Vector3.scale(tmp2, 0.5, tmp2);
      Vector3.add(positions[triangle[2]], positions[triangle[0]], tmp3);
      Vector3.scale(tmp3, 0.5, tmp3);

      positions.push(tmp1.normalize(), tmp2.normalize(), tmp3.normalize());

      let i01 = positions.length - 3;
      let i12 = positions.length - 2;
      let i20 = positions.length - 1;

      const newLevel = level - 1;
      PrimitiveMesh.subdivide(positions, indices, [triangle[0], i01, i20], newLevel);
      PrimitiveMesh.subdivide(positions, indices, [i01, triangle[1], i12], newLevel);
      PrimitiveMesh.subdivide(positions, indices, [i01, i12, i20], newLevel);
      PrimitiveMesh.subdivide(positions, indices, [i20, i12, triangle[2]], newLevel);
    } else {
      indices.push(...triangle);
    }
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
    normals: Vector3[] | null,
    uvs: Vector2[] | null,
    indices: Uint16Array | Uint32Array,
  ) {
    mesh.setPositions(positions);
    mesh.setIndices(indices);
    // 因为不一定要显示指定法向量和纹理坐标
    if (normals) mesh.setNormals(normals);
    if (uvs) mesh.setUVs(uvs);

    mesh.uploadData();
    mesh.addSubMesh(0, indices.length);
  }
}
