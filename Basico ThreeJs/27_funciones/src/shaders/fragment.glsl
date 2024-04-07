precision mediump float;

varying vec2 v_uv;

void main() {
    //Copying uv
    vec2 copy_uv = v_uv;

    //if_condition
    if(copy_uv.x>0.5){
        copy_uv.x = 0.0;
    }else {
        copy_uv.x = 1.0;
    }
    
    gl_FragColor = vec4(copy_uv, 1.0,1.0);
}
