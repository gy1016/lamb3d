attribute vec3 POSITION;
attribute vec3 NORMAL;
attribute vec2 TEXCOORD_0;
uniform mat4 u_viewMat;
uniform mat4 u_projMat;
varying vec3 v_worldPostion;
varying vec2 v_TexCoord;
void main() {
  gl_Position = u_projMat * u_viewMat * vec4(POSITION, 1.0);
  v_worldPostion = POSITION;
  v_TexCoord = TEXCOORD_0;
}
