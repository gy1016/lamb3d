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
  // 是否开启阻尼，感觉没什么用，可以删掉
  enableDamping: boolean;
  // 这个是干嘛的？？
  zoomFactor: number;
  enableRotate: boolean;
  // 键盘平移速度，可以删掉
  keyPanSpeed: number;
  // ？？
  minPolarAngle: number;
  maxPolarAngle: number;
  minAzimuthAngle: number;
  maxAzimuthAngle: number;
  enableZoom: boolean;
  // 阻尼因子，也可以删掉
  dampingFactor: number;
  zoomSpeed: number;
  enablePan: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number = Math.PI;
  rotateSpeed: number;
  // 是否允许键盘操作，可以删掉
  enableKeys: boolean;
  // 键盘上下左右对应的key代码
  keys: { LEFT: number; RIGHT: number; UP: number; BOTTOM: number };
  // 鼠标点击对应的key，其实就是左键，滚轮和右键对应的key
  mouseButtons: { ORBIT: number; ZOOM: number; PAN: number };
  // 当前控制器处于什么状态
  STATE: {
    ROTATE: number;
    ZOOM: number;
    NONE: number;
    PAN: number;
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
    // 我们在这里只使用clientHeight，这样纵横比不会扭曲速度
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

  getAutoRotationAngle(dtime: number) {
    return (this.autoRotateSpeed / 1000) * dtime;
  }

  handleMouseDownRotate(event: MouseEvent) {
    this._rotateStart.setValue(event.clientX, event.clientY);
  }

  handleMouseDownZoom(event: MouseEvent) {
    this._zoomStart.setValue(event.clientX, event.clientY);
  }

  handleMouseDownPan(event: MouseEvent) {
    this._panStart.setValue(event.clientX, event.clientY);
  }

  handleMouseMoveRotate(event) {
    this._rotateEnd.setValue(event.clientX, event.clientY);
    Vector2.subtract(this._rotateEnd, this._rotateStart, this._rotateDelta);

    // x方向平移的百分比
    this.rotateLeft(2 * Math.PI * (this._rotateDelta.x / this.mainElement.clientWidth) * this.rotateSpeed);
    // y方向平移的百分比
    this.rotateUp(2 * Math.PI * (this._rotateDelta.y / this.mainElement.clientHeight) * this.rotateSpeed);
    // 将end设置为新的start
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
    // 将end复制到新的start
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
      // canvas元素监听move事件
      // onMouseMove
      this.mainElement.addEventListener(this.mouseUpEvents[0].type, this.mouseUpEvents[0].listener, false);
      // 父级元素监听鼠标up事件
      // onMouseUp
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
