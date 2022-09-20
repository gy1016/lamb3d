import { Camera } from '../core/Camera';
import { Matrix4, Vector3 } from '../math';
declare type MouseWheelEvent = any;
/**
 * Orbital controls for zooming around a center point.
 */
export declare class OrbitControl {
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
    autoRotateSpeed: number;
    /** Rotate speed. */
    rotateSpeed: number;
    /** Clicking the corresponding key with the mouse is actually the key corresponding to the left button, the scroll wheel and the right button. */
    mouseButtons: {
        ORBIT: number;
        ZOOM: number;
        PAN: number;
    };
    /** What state is the current controller in. */
    STATE: {
        ROTATE: number;
        ZOOM: number;
        NONE: number;
        PAN: number;
    };
    /** Contains mousemove and mouseup. */
    mouseUpEvents: {
        listener: any;
        type: string;
    }[];
    /** Contains mousedown and wheel. */
    constEvents: {
        listener: any;
        type: string;
        element?: Window;
    }[];
    private _position;
    private _offset;
    private _spherical;
    private _sphericalDelta;
    private _sphericalDump;
    private _zoomFrag;
    private _scale;
    private _panOffset;
    private _isMouseUp;
    private _vPan;
    private _state;
    private _rotateStart;
    private _rotateEnd;
    private _rotateDelta;
    private _panStart;
    private _panEnd;
    private _panDelta;
    private _zoomStart;
    private _zoomEnd;
    private _zoomDelta;
    constructor(camera: Camera);
    /**
     * The life cycle of track control destruction, used to remove listener events.
     */
    onDestory(): void;
    /**
     * The orbit controls the life cycle, updating the view based on the current mouse changes.
     * @param dtime Used to calculate how many degrees to rotate.
     */
    onUpdate(dtime: number): void;
    /**
     * Handle left and right translation.
     * @param distance Camera translation distance.
     * @param worldMatrix Camera's world coordinate matrix.
     */
    panLeft(distance: number, worldMatrix: Matrix4): void;
    /**
     * Handle up and down translation.
     * @param distance Camera translation distance.
     * @param worldMatrix Camera's world coordinate matrix.
     */
    panUp(distance: number, worldMatrix: Matrix4): void;
    /**
     * Pan according to panLeft and panUp.
     * @param deltaX The difference between the mouse and the x-direction of the previous view.
     * @param deltaY The difference between the mouse and the y-direction of the previous view
     */
    pan(deltaX: number, deltaY: number): void;
    /**
     * Zoom in view.
     * @param zoomScale Zoom scale.
     */
    zoomIn(zoomScale: number): void;
    /**
     * Zoom out view.
     * @param zoomScale Zoom scale.
     */
    zoomOut(zoomScale: number): void;
    /**
     * Get zoom level.
     * @returns Zoom scale.
     */
    getZoomScale(): number;
    /**
     * Rotate left and right.
     * @param radian Rotation angle, radian system.
     */
    rotateLeft(radian: number): void;
    /**
     * Rotate up and down.
     * @param radian Rotation angle, radian system.
     */
    rotateUp(radian: number): void;
    /**
     * Get auto rotation angle.
     * @param dtime Rendering the time difference between the current frame and the previous frame.
     * @returns Auto rotate speed.
     */
    getAutoRotationAngle(dtime: number): number;
    /**
     * Set rotate start when state is rotate.
     * @param event Mouse event.
     */
    handleMouseDownRotate(event: MouseEvent): void;
    /**
     * Set zoom start when state is zoom.
     * @param event Mouse event.
     */
    handleMouseDownZoom(event: MouseEvent): void;
    /**
     * Set pan start when state is pan.
     * @param event Mouse event.
     */
    handleMouseDownPan(event: MouseEvent): void;
    /**
     * Calculate the rotation difference when the mouse is moved.
     * @param event Mouse event.
     */
    handleMouseMoveRotate(event: MouseEvent): void;
    /**
     * Calculate the rotation difference when the mouse is moved.
     * @param event Mouse event.
     */
    handleMouseMoveZoom(event: MouseEvent): void;
    /**
     * Calculate the pan difference when the mouse is moved.
     * @param event Mouse event.
     */
    handleMouseMovePan(event: MouseEvent): void;
    /**
     * Calculate the wheel difference when the mouse is moved.
     * @param event Mouse event.
     */
    handleMouseWheel(event: MouseWheelEvent): void;
    /**
     * Listen to the mouse click event,
     * and set the context state to the mouse click type according to the click type,
     * and then select the corresponding processing method
     * @param event Mouse event.
     */
    onMouseDown(event: MouseEvent): void;
    /**
     * Monitor mouse movement events,
     * select the corresponding movement processing method for the current context state.
     * @param event Mouse event.
     */
    onMouseMove(event: MouseEvent): void;
    /**
     * Listen for the mouse up event,
     * remove the corresponding listener event and set the context state to none.
     */
    onMouseUp(): void;
    /**
     * Listen to the mouse wheel event,
     * prevent the default behavior,
     * and scale according to the current event event information.
     * @param event Mouse wheel event.
     */
    onMouseWheel(event: MouseWheelEvent): void;
}
export {};
