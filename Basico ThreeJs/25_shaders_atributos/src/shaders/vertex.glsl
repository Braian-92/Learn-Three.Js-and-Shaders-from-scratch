uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec2 uv;
attribute float a_modulus;

varying vec3 v_position;
varying vec2 v_uv;
varying float v_a_modulus;

void main() {
   vec4 modelPosition = modelMatrix * vec4(position,1.0);
   // modelPosition.x += a_modulus;
   // modelPosition.y += a_modulus;
   // modelPosition.z += a_modulus;
   modelPosition.z += a_modulus *0.1;
   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectionPosition = projectionMatrix * viewPosition;

   gl_Position = projectionPosition;

   v_position = position;
   v_uv = uv;
   v_a_modulus = a_modulus;
}
