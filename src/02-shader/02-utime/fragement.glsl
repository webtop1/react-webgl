#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  // if (gl_FragCoord.x < 100.0){
  //   gl_FragColor = vec4(0.1961, 0.6902, 1.0, 1.0);
  // }else{
  //   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  // }
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  gl_FragColor=vec4(st.x,st.y,0.0,1.0);
}