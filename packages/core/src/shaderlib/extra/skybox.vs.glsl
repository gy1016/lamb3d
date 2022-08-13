attribute vec3 POSITION;
varying vec4 v_position;
void main() {
  gl_Position = vec4(POSITION, 1.0);
  v_position = gl_Position;
  gl_Position.z = 1.0;
}