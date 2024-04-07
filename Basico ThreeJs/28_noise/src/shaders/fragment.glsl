precision mediump float;

varying vec2 v_uv;

float random (vec2 st) {
  const float a = 12.9898;
  const float b = 78.233;
  const float c = 43758.543123;
  return fract(sin(dot(st, vec2(a, b))) * c );
}

void main() {
    vec3 color = random(v_uv)*vec3(1.0);
    gl_FragColor = vec4(color, 1.0);
}