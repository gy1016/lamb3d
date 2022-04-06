import { Canvas } from './Canvas';
import { Entity } from './Entity';
import { IHardwareRenderer } from './renderingHardwareInterface/IHardwareRenderer';

export class Engine {
  _hardwareRenderer: IHardwareRenderer;

  protected _canvas: Canvas;

  get canvas(): Canvas {
    return this._canvas;
  }

  constructor(canvas: Canvas, hardwareRenderer: IHardwareRenderer) {
    this._hardwareRenderer = hardwareRenderer;
    this._hardwareRenderer.init(canvas);
    this._canvas = canvas;
  }

  createEntity(name?: string): Entity {
    return new Entity(this, name);
  }
}
