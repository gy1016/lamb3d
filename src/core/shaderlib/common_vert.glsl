attribute vec3 POSITION;
uniform mat4 u_viewMat;
uniform mat4 u_projMat;
void main() {
  gl_Position = u_projMat * u_viewMat * vec4(POSITION, 1.0);
}