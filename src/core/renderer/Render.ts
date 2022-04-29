import { SingleBufferParam } from '../buffer/SingleBufferParam';
import { RenderInfo } from './RenderInfo';

export class Render {
  static drawBindAttributes(renderInfo: RenderInfo) {
    const { gl, vertexBuffer, programInfo } = renderInfo;

    // Get the address of a property variable in a WebGL program in a loop
    for (const attr in programInfo.attribLocations) {
      const targetBufInfo = vertexBuffer[attr];
      if (targetBufInfo != null) {
        if (
          programInfo.attribLocations[attr] === -1 ||
          programInfo.attribLocations[attr] === null ||
          targetBufInfo === null
        ) {
          // not to do anything
        } else {
          const { perVertexSize, type, normalize, stride, voffset } = targetBufInfo as SingleBufferParam;
          gl.bindBuffer(gl.ARRAY_BUFFER, targetBufInfo.id);
          gl.vertexAttribPointer(programInfo.attribLocations[attr], perVertexSize, type, normalize, stride, voffset);
          gl.enableVertexAttribArray(programInfo.attribLocations[attr]);
        }
      } else {
        console.error('error binding : there is no' + attr + ' in vertex Buffer');
      }
    }
  }

  static drawBindUniforms(renderInfo: RenderInfo) {
    const { gl, programInfo } = renderInfo;
    gl.useProgram(programInfo.program);
  }

  static drawRender(renderInfo: RenderInfo) {
    const { gl, vertexBuffer } = renderInfo;

    Render.drawBindAttributes(renderInfo);
    const vertexCount = vertexBuffer.vertexCount;
    const indices = vertexBuffer.vertexIndices;

    if (indices !== (null && undefined) && indices.id !== (null && undefined)) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices.id);
      gl.drawElements(vertexBuffer.primitiveType, indices.elementCount * indices.perVertexSize, indices.type, 0);
    } else {
      gl.drawArrays(vertexBuffer.primitiveType, 0, vertexCount);
    }
  }
}
