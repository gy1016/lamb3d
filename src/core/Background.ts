import { Color, Vector2, Vector3 } from '../math';
import { Engine } from './Engine';
import { BackgroundMode } from './enums/BackgroundMode';
import { ModelMesh } from './mesh/ModelMesh';
import { Sky } from './sky/Sky';

export class Background {
  mode: BackgroundMode = BackgroundMode.SolidColor;

  solidColor: Color = new Color(0.25, 0.25, 0.25, 1.0);

  sky: Sky = new Sky();

  _mesh: ModelMesh;

  constructor(private _engine: Engine) {
    this._mesh = this._createPlane(_engine);
  }

  private _createPlane(engine: Engine): ModelMesh {
    const mesh = new ModelMesh(engine.gl);
    const indices = new Uint8Array([1, 2, 0, 1, 3, 2]);

    const positions: Vector3[] = new Array(4);
    const uvs: Vector2[] = new Array(4);

    for (let i = 0; i < 4; ++i) {
      positions[i] = new Vector3();
      uvs[i] = new Vector2(i % 2, 1 - ((i * 0.5) | 0));
    }

    mesh.setPositions(positions);
    mesh.setUVs(uvs);
    mesh.setIndices(indices);

    mesh.uploadData(false);
    mesh.addSubMesh(0, indices.length);
    return mesh;
  }
}
