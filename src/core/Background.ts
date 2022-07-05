import { Color, Vector3 } from '../math';
import { Engine } from './Engine';
import { BackgroundMode } from './enums/BackgroundMode';
import { Mesh } from './graphic';
import { Material } from './material';
import { SkyBoxMaterial } from './material/SkyBoxMaterial';
import { ModelMesh } from './mesh';

export class Background {
  mode: BackgroundMode = BackgroundMode.SolidColor;

  _mesh: Mesh;
  _material: Material;

  solidColor: Color = new Color(0.25, 0.25, 0.25, 1.0);

  constructor(private _engine: Engine) {
    this._mesh = this._createPlane(this._engine);
    this._material = new SkyBoxMaterial(this._engine);
  }

  private _createPlane(engine: Engine): ModelMesh {
    const mesh = new ModelMesh(engine.gl);
    // const indices = new Uint8Array([0, 3, 1, 1, 3, 2]);

    const positions: Vector3[] = [
      new Vector3(-1, -1, 0),
      new Vector3(1, -1, 0),
      new Vector3(-1, 1, 0),
      new Vector3(-1, 1, 0),
      new Vector3(1, -1, 0),
      new Vector3(1, 1, 0),
    ];

    mesh.setPositions(positions);
    // mesh.setIndices(indices);

    mesh.uploadData(false);
    mesh.addSubMesh(0, 6);
    return mesh;
  }
}
