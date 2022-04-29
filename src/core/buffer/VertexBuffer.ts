import { VertexBufferInfo } from './VertexBufferInfo';
import { SingleBufferParam } from './SingleBufferParam';
import { AttributeType } from '../program/AttributeType';

export class VertexBuffer {
  static createBufferParam(
    gl: WebGLRenderingContext,
    data: number[],
    elementCount: number,
    vType: number,
    bufType: number,
  ) {
    const bufId = gl.createBuffer();
    gl.bindBuffer(bufType, bufId);
    let glArr = null;
    if (vType === gl.FLOAT) {
      glArr = new Float32Array(data);
    } else if (vType === gl.UNSIGNED_SHORT) {
      glArr = new Uint16Array(data);
    } else {
      console.error('createBufferParam:error:unspported vertex type:', vType);
      return null;
    }
    gl.bufferData(bufType, glArr, gl.STATIC_DRAW);
    const vertexNums = data.length / elementCount;
    return new SingleBufferParam(bufId, elementCount, vType, vertexNums);
  }

  static addInfoToVB(
    gl: WebGLRenderingContext,
    vBInfo: VertexBufferInfo,
    data: Array<number>,
    elementCount: number,
    key: string,
    vType: number,
    bufType: number,
  ) {
    if (data instanceof Array) {
      AttributeType.types[key] = true;
      vBInfo[key] = VertexBuffer.createBufferParam(gl, data, elementCount, vType, bufType);
    } else {
      console.log('addInfoToVB error: infoName=' + key, ' Arr type should be Array not', typeof data);
      return false;
    }
  }

  static addPos(gl: WebGLRenderingContext, vBInfo: VertexBufferInfo, posArr: Array<number>) {
    return VertexBuffer.addInfoToVB(gl, vBInfo, posArr, vBInfo.vertexCount, 'vertexPos', gl.FLOAT, gl.ARRAY_BUFFER);
  }

  static addColor(gl: WebGLRenderingContext, vBInfo: VertexBufferInfo, colorArr: Array<number>) {
    return VertexBuffer.addInfoToVB(gl, vBInfo, colorArr, vBInfo.vertexCount, 'vertexColor', gl.FLOAT, gl.ARRAY_BUFFER);
  }

  static addIndices(gl: WebGLRenderingContext, vBInfo: VertexBufferInfo, indicesArr: Array<number>) {
    return VertexBuffer.addInfoToVB(
      gl,
      vBInfo,
      indicesArr,
      vBInfo.vertexCount,
      'vertexIndices',
      gl.UNSIGNED_SHORT,
      gl.ELEMENT_ARRAY_BUFFER,
    );
  }

  static initVertexBuffer(gl: WebGLRenderingContext, vertexCount: number, primitiveType: number) {
    const vertBuffInfo = new VertexBufferInfo();
    vertBuffInfo.vertexCount = vertexCount;
    if (primitiveType === null) {
      vertBuffInfo.primitiveType = gl.TRIANGLE_STRIP;
    } else {
      vertBuffInfo.primitiveType = primitiveType;
    }

    return vertBuffInfo;
  }
}
