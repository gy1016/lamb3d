import { Matrix4 } from '@/math';
import { Mesh } from '../graphic';
import { Material } from '../material';

export class Sky {
  material: Material;
  mesh: Mesh;
  _matrix: Matrix4 = new Matrix4();
}
