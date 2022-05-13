import { BufferBindFlag } from './enums/BufferBindFlag';
import { BufferUsage } from './enums/BufferUsage';
import { BufferUtil } from './BufferUtil';

export class Buffer {
  _gl: WebGLRenderingContext;
  _glBindTarget: number;
  _glBufferUsage: number;
  _nativeBuffer: WebGLBuffer;

  private _type: BufferBindFlag;
  private _byteLength: number;
  // 个人感觉这个属性可以去掉
  private _bufferUsage: BufferUsage;

  /**
   * Buffer binding flag.
   */
  get type(): BufferBindFlag {
    return this._type;
  }

  /**
   * Byte length.
   */
  get byteLength(): number {
    return this._byteLength;
  }

  /**
   * Buffer usage.
   */
  get bufferUsage(): BufferUsage {
    return this._bufferUsage;
  }

  /**
   * Create Buffer.
   * @param gl - WebGLRenderingContext
   * @param type - Buffer binding flag
   * @param byteLength - Byte length
   * @param bufferUsage - Buffer usage
   */
  constructor(gl: WebGLRenderingContext, type: BufferBindFlag, byteLength: number, bufferUsage?: BufferUsage);

  /**
   * Create Buffer.
   * @param engine - Engine
   * @param type - Buffer binding flag
   * @param data - Byte
   * @param bufferUsage - Buffer usage
   */
  constructor(
    gl: WebGLRenderingContext,
    type: BufferBindFlag,
    data: ArrayBuffer | ArrayBufferView,
    bufferUsage?: BufferUsage,
  );

  constructor(
    gl: WebGLRenderingContext,
    type: BufferBindFlag,
    byteLengthOrData: number | ArrayBuffer | ArrayBufferView,
    bufferUsage: BufferUsage = BufferUsage.Static,
  ) {
    this._gl = gl;
    this._type = type;
    this._bufferUsage = bufferUsage;

    const glBufferUsage = BufferUtil._getGLBufferUsage(gl, bufferUsage);
    const glBindTarget = type === BufferBindFlag.VertexBuffer ? gl.ARRAY_BUFFER : gl.ELEMENT_ARRAY_BUFFER;

    this._nativeBuffer = gl.createBuffer();
    this._glBufferUsage = glBufferUsage;
    this._glBindTarget = glBindTarget;

    this.bind();
    if (typeof byteLengthOrData === 'number') {
      this._byteLength = byteLengthOrData;
      gl.bufferData(glBindTarget, byteLengthOrData, glBufferUsage);
    } else {
      this._byteLength = byteLengthOrData.byteLength;
      gl.bufferData(glBindTarget, byteLengthOrData, glBufferUsage);
    }
    gl.bindBuffer(glBindTarget, null);
  }

  /**
   * Bind buffer.
   */
  bind(): void {
    const gl = this._gl;
    gl.bindBuffer(this._glBindTarget, this._nativeBuffer);
  }

  /**
   * Set buffer data.
   * @param data - Input buffer data
   */
  setData(data: ArrayBuffer | ArrayBufferView): void;

  /**
   * Set buffer data.
   * @param data - Input buffer data
   * @param bufferByteOffset - buffer byte offset
   */
  setData(data: ArrayBuffer | ArrayBufferView, bufferByteOffset: number): void;

  /**
   * Set buffer data.
   * @param data - Input buffer data
   * @param bufferByteOffset - Buffer byte offset
   * @param dataOffset - Buffer byte offset
   * @param dataLength - Data length
   */
  setData(data: ArrayBuffer | ArrayBufferView, bufferByteOffset: number, dataOffset: number, dataLength?: number): void;

  /**
   * Set buffer data.
   * @param data - Input buffer data
   * @param bufferByteOffset - Buffer byte offset
   * @param dataOffset - Buffer byte offset
   * @param dataLength - Data length
   * @param options - Update strategy: None/Discard/NoOverwrite
   */
  setData(data: ArrayBuffer | ArrayBufferView, bufferByteOffset: number, dataOffset: number, dataLength: number): void;

  setData(
    data: ArrayBuffer | ArrayBufferView,
    bufferByteOffset: number = 0,
    dataOffset: number = 0,
    dataLength?: number,
  ): void {
    const gl: WebGLRenderingContext = this._gl;
    // 是索引还是顶点
    const glBindTarget: number = this._glBindTarget;
    this.bind();

    /* 这一段看不懂！！！！！！！！ */
    // TypeArray is BYTES_PER_ELEMENT, unTypeArray is 1
    const byteSize = (<Uint8Array>data).BYTES_PER_ELEMENT || 1;
    const dataByteLength = dataLength ? byteSize * dataLength : data.byteLength;

    if (dataOffset !== 0 || dataByteLength < data.byteLength) {
      const isArrayBufferView = (<ArrayBufferView>data).byteOffset !== undefined;
      const subData = new Uint8Array(
        isArrayBufferView ? (<ArrayBufferView>data).buffer : <ArrayBuffer>data,
        dataOffset * byteSize,
        dataByteLength,
      );
      gl.bufferSubData(glBindTarget, bufferByteOffset, subData);
    } else {
      gl.bufferSubData(glBindTarget, bufferByteOffset, data);
    }
    gl.bindBuffer(glBindTarget, null);
  }

  /**
   * Get buffer data.
   * @param data - Output buffer data
   */
  getData(data: ArrayBufferView): void;

  /**
   * Get buffer data.
   * @param data - Output buffer data
   * @param bufferByteOffset - Buffer byte offset
   */
  getData(data: ArrayBufferView, bufferByteOffset: number): void;

  /**
   * Get buffer data.
   * @param data - Output buffer data
   * @param bufferByteOffset - Buffer byte offset
   * @param dataOffset - Output data offset
   * @param dataLength - Output data length
   */
  getData(data: ArrayBufferView, bufferByteOffset: number, dataOffset: number, dataLength: number): void;

  getData(data: ArrayBufferView, bufferByteOffset: number = 0, dataOffset: number = 0, dataLength?: number): void {
    throw 'Buffer is write-only on WebGL1.0 platforms.';
  }
}
