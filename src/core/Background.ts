import { Color, Vector2, Vector3 } from '../math';
import { BackgroundMode } from './enums/BackgroundMode';
import { Sky } from './sky/Sky';

export class Background {
  mode: BackgroundMode = BackgroundMode.SolidColor;

  solidColor: Color = new Color(0.25, 0.25, 0.25, 1.0);

  sky: Sky = new Sky();

  constructor() {}
}
