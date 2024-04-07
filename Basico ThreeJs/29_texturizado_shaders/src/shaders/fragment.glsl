precision mediump float;

uniform sampler2D u_texture;

varying vec2 v_uv;

void main() {
    vec2 new_uv = vec2(1.0-v_uv.x,1.0-v_uv.y);
    vec3 color_texture = texture2D(u_texture, new_uv).rgb;
    gl_FragColor = vec4(color_texture,1.0);
}