varying mediump vec2 texCoord0
attribute vec2 a_texCoord0;
 

void main(){
    texCoord0 = a_texCoord0;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ) ;
}