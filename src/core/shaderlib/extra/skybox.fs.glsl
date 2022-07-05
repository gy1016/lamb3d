precision mediump float;

uniform samplerCube u_Skybox;
uniform mat4 u_invVPMat;

varying vec4 v_position;
void main() {
  vec4 t = u_invVPMat * v_position;
  gl_FragColor = textureCube(u_Skybox, normalize(t.xyz / t.w));
}