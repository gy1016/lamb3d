precision mediump float;
varying vec3 v_worldPostion;
varying vec2 v_TexCoord;
uniform sampler2D u_Sampler;
uniform vec3 u_pointLightPosition;
uniform vec3 u_pointLightColor;
uniform vec3 u_ambientightColor;
void main() {
  vec3 normal = normalize(v_worldPostion);
  vec3 lightDirection = normalize(u_pointLightPosition - v_worldPostion);
  float nDotL = max(dot(lightDirection, normal), 0.0);
  vec4 textureColor = texture2D(u_Sampler, v_TexCoord);
  vec3 diffuse = u_pointLightColor * textureColor.rgb * nDotL;
  vec3 ambient = u_ambientightColor * textureColor.rgb;
  gl_FragColor = vec4(diffuse + ambient, textureColor.a);
}
