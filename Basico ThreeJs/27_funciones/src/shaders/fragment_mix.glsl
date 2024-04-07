precision mediump float;

varying vec2 v_uv;

void main() {
    vec3 mixing = mix(vec3(0.0,0.0,1.0),vec3(0.0,1.0,0.0),v_uv.x);
    
    gl_FragColor = vec4(mixing,1.0);
}
