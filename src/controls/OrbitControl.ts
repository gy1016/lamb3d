import { Camera } from '../core/Camera';
import { Matrix4, Vector2, Vector3 } from '../math';
import { Spherical } from './Spherical';

type MouseWheelEvent = any;

export class OrbitControl {
  camera: Camera;
  domElement: HTMLElement | Document;
  mainElement: HTMLCanvasElement;
  fov: number;
  target: Vector3;
  up: Vector3;
  minDistance: number;
  maxDistance: number;
  minZoom: number;
  maxZoom: number;
  enableDamping: boolean;
  zoomFactor: number;
  enableRotate: boolean;
  keyPanSpeed: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  minAzimuthAngle: number;
  maxAzimuthAngle: number;
  enableZoom: boolean;
  dampingFactor: number;
  zoomSpeed: number;
  enablePan: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number = Math.PI;
  rotateSpeed: number;
  enableKeys: boolean;
  keys: { LEFT: number; RIGHT: number; UP: number; BOTTOM: number };
  mouseButtons: { ORBIT: number; ZOOM: number; PAN: number };
  STATE: {
    TOUCH_ROTATE: number;
    ROTATE: number;
    TOUCH_PAN: number;
    ZOOM: number;
    NONE: number;
    PAN: number;
    TOUCH_ZOOM: number;
  };
  mouseUpEvents: { listener: any; type: string }[];
  constEvents: { listener: any; type: string; element?: Window }[];

  private _position: Vector3;
  private _offset: Vector3;
  private _spherical: Spherical;
  private _sphericalDelta: Spherical;
  private _sphericalDump: Spherical;
  private _zoomFrag: number;
  private _scale: number;
  private _panOffset: Vector3;
  private _isMouseUp: boolean;
  private _vPan: Vector3;
  private _state: any;
  private _rotateStart: Vector2;
  private _rotateEnd: Vector2;
  private _rotateDelta: Vector2;
  private _panStart: Vector2;
  private _panEnd: Vector2;
  private _panDelta: Vector2;
  private _zoomStart: Vector2;
  private _zoomEnd: Vector2;
  private _zoomDelta: Vector2;

  constructor(camera: Camera) {
    this.camera = camera;
    this.domElement = document;
    this.mainElement = camera.engine.canvas._canvas;
    this.fov = 45;
    this.target = new Vector3();
    this.up = new Vector3(0, 1, 0);
    this.minDistance = 0.1;
    this.maxDistance = Infinity;
    this.minZoom = 0.0;
    this.maxZoom = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = true;
    this.dampingFactor = 0.1;
    this.zoomFactor = 0.2;
    this.enableZoom = true;
    this.zoomSpeed = 1.0;
    this.enableRotate = true;
    this.rotateSpeed = 1.0;
    this.enablePan = true;
    this.keyPanSpeed = 7.0;
    this.autoRotate = false;
    this.enableKeys = false;
    this.keys = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      BOTTOM: 40,
    };
    this.mouseButtons = {
      ORBIT: 0,
      ZOOM: 1,
      PAN: 2,
    };

    // Reuse objects to prevent excessive stack allocation.
    // update
    this._position = new Vector3();
    this._offset = new Vector3();
    this._spherical = new Spherical();
    this._sphericalDelta = new Spherical();
    this._sphericalDump = new Spherical();
    this._zoomFrag = 0;
    this._scale = 1;
    this._panOffset = new Vector3();
    this._isMouseUp = true;

    // pan
    this._vPan = new Vector3();

    // state
    this._rotateStart = new Vector2();
    this._rotateEnd = new Vector2();
    this._rotateDelta = new Vector2();

    this._panStart = new Vector2();
    this._panEnd = new Vector2();
    this._panDelta = new Vector2();

    this._zoomStart = new Vector2();
    this._zoomEnd = new Vector2();
    this._zoomDelta = new Vector2();

    this.STATE = {
      NONE: -1,
      ROTATE: 0,
      ZOOM: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_ZOOM: 4,
      TOUCH_PAN: 5,
    };
    this._state = this.STATE.NONE;

    this.constEvents = [
      { type: 'mousedown', listener: this.onMouseDown.bind(this) },
      { type: 'wheel', listener: this.onMouseWheel.bind(this) },
    ];

    this.mouseUpEvents = [
      { type: 'mousemove', listener: this.onMouseMove.bind(this) },
      { type: 'mouseup', listener: this.onMouseUp.bind(this) },
    ];

    this.constEvents.forEach((ele) => {
      if (ele.element) {
        ele.element.addEventListener(ele.type, ele.listener, false);
      } else {
        this.mainElement.addEventListener(ele.type, ele.listener, false);
      }
    });
  }

  panLeft(distance: number, worldMatrix: Matrix4) {
    const e = worldMatrix.elements;
    this._vPan.setValue(e[0], e[1], e[2]);
    this._vPan.scale(distance);
    this._panOffset.add(this._vPan);
  }

  panUp(distance: number, worldMatrix: Matrix4) {
    const e = worldMatrix.elements;
    this._vPan.setValue(e[4], e[5], e[6]);
    this._vPan.scale(distance);
    this._panOffset.add(this._vPan);
  }

  pan(deltaX: number, deltaY: number) {
    // perspective only
    const position: Vector3 = this.camera.transform.position;
    position.cloneTo(this._vPan);
    this._vPan.subtract(this.target);
    let targetDistance = this._vPan.length();

    targetDistance *= (this.fov / 2) * (Math.PI / 180);

    this.panLeft(-2 * deltaX * (targetDistance / this.mainElement.clientHeight), this.camera.transform.worldMatrix);
    this.panUp(2 * deltaY * (targetDistance / this.mainElement.clientHeight), this.camera.transform.worldMatrix);
  }

  zoomIn(zoomScale: number): void {
    // perspective only
    this._scale *= zoomScale;
  }

  zoomOut(zoomScale: number): void {
    // perspective only
    this._scale /= zoomScale;
  }

  getZoomScale() {
    return Math.pow(0.95, this.zoomSpeed);
  }

  rotateLeft(radian: number) {
    this._sphericalDelta.theta -= radian;
    if (this.enableDamping) {
      this._sphericalDump.theta = -radian;
    }
  }

  rotateUp(radian: number) {
    this._sphericalDelta.phi -= radian;
    if (this.enableDamping) {
      this._sphericalDump.phi = -radian;
    }
  }

  handleMouseDownRotate(event: MouseEvent) {
    this._rotateStart.setValue(event.clientX, event.clientY);
  }

  handleMouseDownZoom(event) {
    this._zoomStart.setValue(event.clientX, event.clientY);
  }

  handleMouseDownPan(event) {
    this._panStart.setValue(event.clientX, event.clientY);
  }

  handleMouseMoveRotate(event) {
    this._rotateEnd.setValue(event.clientX, event.clientY);
    Vector2.subtract(this._rotateEnd, this._rotateStart, this._rotateDelta);

    this.rotateLeft(2 * Math.PI * (this._rotateDelta.x / this.mainElement.clientWidth) * this.rotateSpeed);
    this.rotateUp(2 * Math.PI * (this._rotateDelta.y / this.mainElement.clientHeight) * this.rotateSpeed);

    this._rotateEnd.cloneTo(this._rotateStart);
  }

  handleMouseMoveZoom(event) {
    this._zoomEnd.setValue(event.clientX, event.clientY);
    Vector2.subtract(this._zoomEnd, this._zoomStart, this._zoomDelta);

    if (this._zoomDelta.y > 0) {
      this.zoomOut(this.getZoomScale());
    } else if (this._zoomDelta.y < 0) {
      this.zoomIn(this.getZoomScale());
    }

    this._zoomEnd.cloneTo(this._zoomStart);
  }

  handleMouseMovePan(event: MouseEvent): void {
    this._panEnd.setValue(event.clientX, event.clientY);
    Vector2.subtract(this._panEnd, this._panStart, this._panDelta);

    this.pan(this._panDelta.x, this._panDelta.y);

    this._panEnd.cloneTo(this._panStart);
  }

  handleMouseWheel(event: MouseWheelEvent): void {
    if (event.deltaY < 0) {
      this.zoomIn(this.getZoomScale());
    } else if (event.deltaY > 0) {
      this.zoomOut(this.getZoomScale());
    }
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();

    this._isMouseUp = false;

    switch (event.button) {
      case this.mouseButtons.ORBIT:
        this.handleMouseDownRotate(event);
        this._state = this.STATE.ROTATE;
        break;
      case this.mouseButtons.ZOOM:
        this.handleMouseDownZoom(event);
        this._state = this.STATE.ZOOM;
        break;
      case this.mouseButtons.PAN:
        this.handleMouseDownPan(event);
        this._state = this.STATE.PAN;
        break;
    }

    if (this._state !== this.STATE.NONE) {
      const element = this.domElement === document ? this.domElement.body : this.domElement;
      this.mainElement.addEventListener(this.mouseUpEvents[0].type, this.mouseUpEvents[0].listener, false);
      element.addEventListener(this.mouseUpEvents[1].type, this.mouseUpEvents[1].listener, false);
    }
  }

  onMouseMove(event: MouseEvent) {
    event.preventDefault();

    switch (this._state) {
      case this.STATE.ROTATE:
        this.handleMouseMoveRotate(event);
        break;

      case this.STATE.ZOOM:
        this.handleMouseMoveZoom(event);
        break;

      case this.STATE.PAN:
        this.handleMouseMovePan(event);
        break;
    }
  }

  onMouseUp() {
    this._isMouseUp = true;

    this.mouseUpEvents.forEach((ele) => {
      const element = this.domElement === document ? this.domElement.body : this.domElement;
      element.removeEventListener(ele.type, ele.listener, false);
      this.mainElement.removeEventListener(ele.type, ele.listener, false);
    });

    this._state = this.STATE.NONE;
  }

  onMouseWheel(event: MouseWheelEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.handleMouseWheel(event);
  }
}
