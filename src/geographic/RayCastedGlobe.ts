import { ModelMesh, PrimitiveMesh } from '../core/mesh';
import { Ellipsoid } from './Ellipsoid';
import { ImageMaterial, Material } from '../core/material';
import { Shader } from '../core/shader';
import { Engine } from '../core/Engine';
import { earthUrl } from '../config';
import { Entity } from '../core/Entity';

export class RayCastedGlobe {
  private _shape: Ellipsoid = Ellipsoid.ScaledWgs84;
  private _shader: Shader = Shader.find('rayCastedGlobe');
  private _mesh: ModelMesh;
  private _material: Material;

  /** The collection of entities under the earth. */
  entities: Entity[] = [];

  /** The ellipsoid parameters corresponding to the sphere. */
  get shape() {
    return this._shape;
  }

  /** Cube mesh for GPU ray tracing. */
  get mesh() {
    return this._mesh;
  }

  /** The material of the sphere selection. */
  get material() {
    return this._material;
  }

  /** The shader of the sphere. */
  get shader() {
    return this._shader;
  }

  constructor(engine: Engine) {
    this._mesh = PrimitiveMesh.createCuboid(engine);
    this._material = new ImageMaterial(engine, this.shader, earthUrl);
  }
}
