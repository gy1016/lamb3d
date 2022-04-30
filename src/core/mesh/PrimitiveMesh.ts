import { Mesh } from './Mesh';

export class PrimitiveMesh {
  /**
   * According width, height and thick to create cube
   * @param width
   * @param height
   * @param thick
   * @returns return a mesh, include position, uv, normals and indicies
   */
  static createCuboid(width = 1, height = 1, thick = 1) {
    const a = width / 2;
    const b = height / 2;
    const c = thick / 2;

    // prettier-ignore
    const posArr = [
      // Front face
      // left botton start counterclockwise
      -a, -b, c,
       a, -b, c,
       a,  b, c,
      -a,  b, c,

      // Back face
      -a, -b, -c,
      -a,  b, -c,
       a,  b, -c,
       a, -b, -c,

      // Top face
      -a,  b, -c,
      -a,  b,  c,
       a,  b,  c,
       a,  b, -c,

      // Bottom face
      -a, -b, -c,
       a, -b, -c,
       a, -b,  c,
      -a, -b,  c,

      // Right face
       a, -b, -c,
       a,  b, -c,
       a,  b,  c,
       a, -b,  c,

      // Left face
      -a, -b, -c,
      -a, -b,  c,
      -a,  b,  c,
      -a,  b, -c,      
    ]

    // prettier-ignore
    const uv = [
      // Front face
      0.0, 0.0, 
      1.0, 0.0, 
      1.0, 1.0, 
      0.0, 1.0,

      // back face
      1.0, 0.0, 
      1.0, 1.0, 
      0.0, 1.0, 
      0.0, 0.0,

      //top
      0.0, 1.0, 
      0.0, 0.0, 
      1.0, 0.0, 
      1.0, 1.0,

      //bottom
      0.0, 0.0, 
      1.0, 0.0, 
      1.0, 1.0, 
      0.0, 1.0,

      //right
      1.0, 0.0, 
      1.0, 1.0, 
      0.0, 1.0, 
      0.0, 0.0,

      //left
      0.0, 0.0, 
      1.0, 0.0, 
      1.0, 1.0, 
      0.0, 1.0,
    ];

    // prettier-ignore
    const vertexNormal = [
      // Front
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,

      // Back
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,

      // Top
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      // Bottom
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,

      // Right
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,

      // Left
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0
    ];

    // prettier-ignore
    const indices = new Uint8Array([
      0, 1, 2, 0, 2, 3,    // front
      4, 5, 6, 4, 6, 7,    // back
      8, 9, 10, 8, 10, 11,   // top
      12, 13, 14, 12, 14, 15,   // bottom
      16, 17, 18, 16, 18, 19,   // right
      20, 21, 22, 20, 22, 23,   // left
    ]);

    const mesh = new Mesh('CuboidMesh');
    PrimitiveMesh._initialize(mesh, posArr, vertexNormal, uv, indices);
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
    mesh: Mesh,
    positions: number[],
    normals: number[],
    uv: number[],
    indices: Uint8Array | Uint16Array,
  ) {
    mesh.setPositions(positions);
    mesh.setNormals(normals);
    mesh.setUVs(uv);
    mesh.setIndices(indices);
  }
}
