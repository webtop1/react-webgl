precision lowp float;
varying vec2 vUv;
varying float vElevation;

uniform sampler2D uTexture;

void main(){
    gl_FragColor=vec4(vUv,0.,1.);
    float height=vElevation+.05*10.;
    gl_FragColor=vec4(1.*height,0.,0.,1.);
    
    // 根据UV,取出对应的颜色
    // float height=vElevation+.05*20.;
    // vec4 textureColor=texture2D(uTexture,vUv);
    // textureColor.rgb*=height;
    // gl_FragColor=textureColor;
}
