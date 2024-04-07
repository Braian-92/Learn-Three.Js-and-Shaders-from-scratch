precision mediump float;

varying vec2 v_uv;
varying vec3 v_position;

void main() {
    vec3 color = vec3(1.0,1.0,1.0);
    color.r = step(0.0,v_position.x);
    color.g = step(0.0,v_position.y);
    
    gl_FragColor = vec4(color,1.0);
}
