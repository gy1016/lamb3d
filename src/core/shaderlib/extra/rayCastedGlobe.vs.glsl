attribute vec4 POSITION;
uniform mat4 u_vpMat;
varying vec3 v_worldPosition;

void main()
{
    gl_Position = u_vpMat * POSITION;
    v_worldPosition = POSITION.xyz;
}