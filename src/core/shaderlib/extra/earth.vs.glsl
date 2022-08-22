attribute vec3 POSITION;
attribute vec2 TEXCOORD_0;
varying vec2 v_TexCoord;
varying vec3 v_worldPostion;
void main() {
  v_worldPostion = POSITION;
  v_TexCoord = TEXCOORD_0;
}