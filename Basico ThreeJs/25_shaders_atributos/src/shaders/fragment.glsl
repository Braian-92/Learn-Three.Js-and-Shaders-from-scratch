precision mediump float;

varying vec3 v_position;
varying vec2 v_uv;

varying float v_a_modulus;

void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0,1.0);
    // gl_FragColor = vec4(v_position,1.0);
    // gl_FragColor = vec4(v_uv, 1.0,1.0);
    // gl_FragColor = vec4(1.0,v_uv.x, 1.0,1.0);

    gl_FragColor = vec4(v_a_modulus, 1.0, 1.0,1.0); //Testing v_a_modulus attribute
}
