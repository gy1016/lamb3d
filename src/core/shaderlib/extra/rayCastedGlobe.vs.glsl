attribute vec3 POSITION;
uniform mat4 u_vpMat;
varying vec3 v_worldPosition;

void main()
{
    gl_Position = u_vpMat * vec4(POSITION, 1.0);
    v_worldPosition = POSITION;
}