import { Camera } from '../core/Camera';
import { Matrix4, Vector2, Vector3 } from '../math';
import { Spherical } from './Spherical';

type MouseWheelEvent = any;

/**
 * Orbital controls for zooming around a center point.
 */
export class OrbitControl {
  /** Camera instance, the essence of orbit control is to change the camera position. */
  camera: Camera;
  /** DOM element, mainly used to listen for mouse up events. */
  domElement: HTMLElement | Document;
  /** Canvas element, mainly used to monitor mouse movement events. */
  mainElement: HTMLCanvasElement;
  /** Camera frustum angle. */
  fov: number;
  /** Where the camera is looking. */
  target: Vector3;
  /** Camera up. */
  up: Vector3;
  /** The minimum distance from the camera to the object. */
  minDistance: number;
  /** The maximum distance from the camera to the object. */
  maxDistance: number;
  /** The smallest zoom scale of the camera. */
  minZoom: number;
  /** The maximum zoom scale of the camera. */
  maxZoom: number;
  /** Scaling factor. */
  zoomFactor: number;
  /** Min polar angle. */
  minPolarAngle: number;
  /** Max polar angle. */
  maxPolarAngle: number;
  /** Min azimuth angle. */
  minAzimuthAngle: number;
  /** Max azimuth angle. */
  maxAzimuthAngle: number;
  /** Whether to enable damping. */
  enableDamping: boolean;
  /** Whether to enable rotate. */
  enableRotate: boolean;
  /** Whether to enable zoom. */
  enableZoom: boolean;
  /** Whether to enable pan. */
  enablePan: boolean;
  /** Damping factor */
  dampingFactor: number;
  /** Zoom speed */
  zoomSpeed: number;
  /** Whether to auto rotate. */
  autoRotate: boolean;
  /** Auto rotate speed. */
  autoRotateSpeed: number = Math.PI;
  /** Rotate speed. */
  rotateSpeed: number;
  /** Clicking the corresponding key with the mouse is actually the key corresponding to the left button, the scroll wheel and the right button. */
  mouseButtons: { ORBIT: number; ZOOM: number; PAN: number };
  /** What state is the current controller in. */
  STATE: {
    ROTATE: number;
    ZOOM: number;
    NONE: number;
    PAN: number;
  };
  /** Contains mousemove and mouseup. */
  mouseUpEvents: { listener: any; type: string }[];
  /** Contains mousedown and wheel. */
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
    this.autoRotate = false;
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

    // onMouseDown里面处理了mousemove和mouseup的事件
    this.constEvents.forEach((ele) => {
      if (ele.element) {
        ele.element.addEventListener(ele.type, ele.listener, false);
      } else {
        this.mainElement.addEventListener(ele.type, ele.listener, false);
      }
    });
  }

  /**
   * The life cycle of track control destruction, used to remove listener events.
   */
  onDestory(): void {
    this.constEvents.forEach((ele) => {
      if (ele.element) {
        ele.element.removeEventListener(ele.type, ele.listener, false);
      } else {
        this.mainElement.removeEventListener(ele.type, ele.listener, false);
      }
    });
    const element = this.domElement === document ? this.domElement.body : this.domElement;
    this.mainElement.removeEventListener(this.mouseUpEvents[0].type, this.mouseUpEvents[0].listener, false);
    element.removeEventListener(this.mouseUpEvents[1].type, this.mouseUpEvents[1].listener, false);
  }

  /**
   * The orbit controls the life cycle, updating the view based on the current mouse changes.
   * @param dtime Used to calculate how many degrees to rotate.
   */
  onUpdate(dtime: number) {
    const position: Vector3 = this.camera.transform.position;
    position.cloneTo(this._offset);
    this._offset.subtract(this.target);
    this._spherical.setFromVec3(this._offset);

    if (this.autoRotate && this._state === this.STATE.NONE) {
      this.rotateLeft(this.getAutoRotationAngle(dtime));
    }

    this._spherical.theta += this._sphericalDelta.theta;
    this._spherical.phi += this._sphericalDelta.phi;

    this._spherical.theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, this._spherical.theta));
    this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi));
    this._spherical.makeSafe();

    if (this._scale !== 1) {
      this._zoomFrag = this._spherical.radius * (this._scale - 1);
    }

    this._spherical.radius += this._zoomFrag;
    this._spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this._spherical.radius));

    this.target.add(this._panOffset);
    this._spherical.setToVec3(this._offset);
    this.target.cloneTo(this._position);
    this._position.add(this._offset);

    this.camera.transform.position = this._position;
    this.camera.transform.lookAt(this.target, this.up);

    if (this.enableDamping === true) {
      this._sphericalDump.theta *= 1 - this.dampingFactor;
      this._sphericalDump.phi *= 1 - this.dampingFactor;
      this._zoomFrag *= 1 - this.zoomFactor;

      if (this._isMouseUp) {
        this._sphericalDelta.theta = this._sphericalDump.theta;
        this._sphericalDelta.phi = this._sphericalDump.phi;
      } else {
        this._sphericalDelta.set(0, 0, 0);
      }
    } else {
      this._sphericalDelta.set(0, 0, 0);
      this._zoomFrag = 0;
    }

    this._scale = 1;
    this._panOffset.setValue(0, 0, 0);
  }

  /**
   * Handle left and right translation.
   * @param distance Camera translation distance.
   * @param worldMatrix Camera's world coordinate matrix.
   */
  panLeft(distance: number, worldMatrix: Matrix4) {
    const e = worldMatrix.elements;
    this._vPan.setValue(e[0], e[1], e[2]);
    this._vPan.scale(distance);
    this._panOffset.add(this._vPan);
  }

  /**
   * Handle up and down translation.
   * @param distance Camera translation distance.
   * @param worldMatrix Camera's world coordinate matrix.
   */
  panUp(distance: number, worldMatrix: Matrix4) {
    const e = worldMatrix.elements;
    this._vPan.setValue(e[4], e[5], e[6]);
    this._vPan.scale(distance);
    this._panOffset.add(this._vPan);
  }

  /**
   * Pan according to panLeft and panUp.
   * @param deltaX The difference between the mouse and the x-direction of the previous view.
   * @param deltaY The difference between the mouse and the y-direction of the previous view
   */
  pan(deltaX: number, deltaY: number) {
    // perspective only
    const position: Vector3 = this.camera.transform.position;
    position.cloneTo(this._vPan);
    this._vPan.subtract(this.target);
    let targetDistance = this._vPan.length();

    targetDistance *= (this.fov / 2) * (Math.PI / 180);
    // 我们在这里只使用clientHeight，这样纵横比不会扭曲速度
    this.panLeft(-2 * deltaX * (targetDistance / this.mainElement.clientHeight), this.camera.transform.worldMatrix);
    this.panUp(2 * deltaY * (targetDistance / this.mainElement.clientHeight), this.camera.transform.worldMatrix);
  }

  /**
   * Zoom in view.
   * @param zoomScale Zoom scale.
   */
  zoomIn(zoomScale: number): void {
    // perspective only
    this._scale *= zoomScale;
  }

  /**
   * Zoom out view.
   * @param zoomScale Zoom scale.
   */
  zoomOut(zoomScale: number): void {
    // perspective only
    this._scale /= zoomScale;
  }

  /**
   * Get zoom level.
   * @returns Zoom scale.
   */
  getZoomScale() {
    return Math.pow(0.95, this.zoomSpeed);
  }

  /**
   * Rotate left and right.
   * @param radian Rotation angle, radian system.
   */
  rotateLeft(radian: number) {
    this._sphericalDelta.theta -= radian;
    if (this.enableDamping) {
      this._sphericalDump.theta = -radian;
    }
  }

  /**
   * Rotate up and down.
   * @param radian Rotation angle, radian system.
   */
  rotateUp(radian: number) {
    this._sphericalDelta.phi -= radian;
    if (this.enableDamping) {
      this._sphericalDump.phi = -radian;
    }
  }

  /**
   * Get auto rotation angle.
   * @param dtime Rendering the time difference between the current frame and the previous frame.
   * @returns Auto rotate speed.
   */
  getAutoRotationAngle(dtime: number) {
    return (this.autoRotateSpeed / 1000) * dtime;
  }

  /**
   * Set rotate start when state is rotate.
   * @param event Mouse event.
   */
  handleMouseDownRotate(event: MouseEvent) {
    this._rotateStart.setValue(event.clientX, event.clientY);
  }

  /**
   * Set zoom start when state is zoom.
   * @param event Mouse event.
   */
  handleMouseDownZoom(event: MouseEvent) {
    this._zoomStart.setValue(event.clientX, event.clientY);
  }

  /**
   * Set pan start when state is pan.
   * @param event Mouse event.
   */
  handleMouseDownPan(event: MouseEvent) {
    this._panStart.setValue(event.clientX, event.clientY);
  }

  /**
   * Calculate the rotation difference when the mouse is moved.
   * @param event Mouse event.
   */
  handleMouseMoveRotate(event: MouseEvent) {
    this._rotateEnd.setValue(event.clientX, event.clientY);
    Vector2.subtract(this._rotateEnd, this._rotateStart, this._rotateDelta);

    // x方向平移的百分比
    this.rotateLeft(2 * Math.PI * (this._rotateDelta.x / this.mainElement.clientWidth) * this.rotateSpeed);
    // y方向平移的百分比
    this.rotateUp(2 * Math.PI * (this._rotateDelta.y / this.mainElement.clientHeight) * this.rotateSpeed);
    // 将end设置为新的start
    this._rotateEnd.cloneTo(this._rotateStart);
  }

  /**
   * Calculate the rotation difference when the mouse is moved.
   * @param event Mouse event.
   */
  handleMouseMoveZoom(event: MouseEvent) {
    this._zoomEnd.setValue(event.clientX, event.clientY);
    Vector2.subtract(this._zoomEnd, this._zoomStart, this._zoomDelta);

    if (this._zoomDelta.y > 0) {
      this.zoomOut(this.getZoomScale());
    } else if (this._zoomDelta.y < 0) {
      this.zoomIn(this.getZoomScale());
    }
    // 将end复制到新的start
    this._zoomEnd.cloneTo(this._zoomStart);
  }

  /**
   * Calculate the pan difference when the mouse is moved.
   * @param event Mouse event.
   */
  handleMouseMovePan(event: MouseEvent): void {
    this._panEnd.setValue(event.clientX, event.clientY);
    Vector2.subtract(this._panEnd, this._panStart, this._panDelta);

    this.pan(this._panDelta.x, this._panDelta.y);

    this._panEnd.cloneTo(this._panStart);
  }

  /**
   * Calculate the wheel difference when the mouse is moved.
   * @param event Mouse event.
   */
  handleMouseWheel(event: MouseWheelEvent): void {
    if (event.deltaY < 0) {
      this.zoomIn(this.getZoomScale());
    } else if (event.deltaY > 0) {
      this.zoomOut(this.getZoomScale());
    }
  }

  /**
   * Listen to the mouse click event,
   * and set the context state to the mouse click type according to the click type,
   * and then select the corresponding processing method
   * @param event Mouse event.
   */
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
      // canvas元素监听move事件
      // onMouseMove
      this.mainElement.addEventListener(this.mouseUpEvents[0].type, this.mouseUpEvents[0].listener, false);
      // 父级元素监听鼠标up事件
      // onMouseUp
      element.addEventListener(this.mouseUpEvents[1].type, this.mouseUpEvents[1].listener, false);
    }
  }

  /**
   * Monitor mouse movement events,
   * select the corresponding movement processing method for the current context state.
   * @param event Mouse event.
   */
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

  /**
   * Listen for the mouse up event,
   * remove the corresponding listener event and set the context state to none.
   */
  onMouseUp() {
    this._isMouseUp = true;

    this.mouseUpEvents.forEach((ele) => {
      const element = this.domElement === document ? this.domElement.body : this.domElement;
      element.removeEventListener(ele.type, ele.listener, false);
      this.mainElement.removeEventListener(ele.type, ele.listener, false);
    });

    this._state = this.STATE.NONE;
  }

  /**
   * Listen to the mouse wheel event,
   * prevent the default behavior,
   * and scale according to the current event event information.
   * @param event Mouse wheel event.
   */
  onMouseWheel(event: MouseWheelEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.handleMouseWheel(event);
  }
}
