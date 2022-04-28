export declare class Matrix4 {
  elements: Float32Array;
  constructor(m?: Matrix4);
  /**
   * Set this to Identity Matrix
   * @returns this
   */
  setIdentity(): this;
  /**
   * Copy reference matrix to this
   * @param src Reference Matrix
   * @returns this
   */
  set(src: Matrix4): this;
  /**
   * A = A * B
   * @param other Reference Matrix
   * @returns this
   */
  concat(other: Matrix4): this;
  multiply: (other: Matrix4) => this;
  /**
   * Transpose matrix
   * @returns this
   */
  transpose(): this;
  /**
   * inv(A) = A* / |A|
   * @param other Reference Matrix
   * @returns
   */
  setInverseOf(other: Matrix4): this;
  invert(): this;
  /**
   * Set ortho matrix
   * @param left
   * @param right
   * @param bottom
   * @param top
   * @param near
   * @param far
   * @returns
   */
  setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number): this;
  ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): this;
  /**
   * Set perspective matrix
   * @param fovy spatial perspective
   * @param aspect box width / box height
   * @param near box near
   * @param far box far
   * @returns this
   */
  setPerspective(fovy: number, aspect: number, near: number, far: number): this;
  perspective(fovy: number, aspect: number, near: number, far: number): this;
  setScale(x: number, y: number, z: number): this;
  scale(x: number, y: number, z: number): this;
  setTranslate(x: number, y: number, z: number): this;
  translate(x: number, y: number, z: number): this;
  setRotate(angle: number, x: number, y: number, z: number): this;
  rotate(angle: number, x: number, y: number, z: number): this;
  setLookAt(
    eyeX: number,
    eyeY: number,
    eyeZ: number,
    centerX: number,
    centerY: number,
    centerZ: number,
    upX: number,
    upY: number,
    upZ: number,
  ): this;
  lookAt(
    eyeX: number,
    eyeY: number,
    eyeZ: number,
    centerX: number,
    centerY: number,
    centerZ: number,
    upX: number,
    upY: number,
    upZ: number,
  ): this;
}
