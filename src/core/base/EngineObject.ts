import { Engine } from '../Engine';

export abstract class EngineObject {
  private static _instanceIdCounter: number = 0;

  readonly instanceId: number = ++EngineObject._instanceIdCounter;

  protected _engine: Engine;
  protected _destroyed: boolean = false;

  get engine(): Engine {
    return this._engine;
  }

  get destroyed(): boolean {
    return this._destroyed;
  }

  constructor(engine: Engine) {
    this._engine = engine;
  }

  destroy(): void {
    if (this._destroyed) return;

    console.log('destroy');
  }
}
