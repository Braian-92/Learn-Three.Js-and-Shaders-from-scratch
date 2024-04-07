precision mediump float;

varying vec2 v_uv;

void main() {
    vec3 color = vec3(1.0,1.0,1.0);
    color.r = clamp(v_uv.y,0.0,1.0);
    color.g = clamp(v_uv.x,0.0,1.0);
    color.b = clamp(v_uv.x,0.0,1.0);
    
    gl_FragColor = vec4(color,1.0);
}
