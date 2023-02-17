//新的伪随机函数，接受一个vec2，产生一个0到1的数
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(565656.233,123123.2033))) * 323434.34344);
}

//升级版伪随机，接受一个vec2，产生x和y都是0到1的vec2
vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(234234.1,54544.7)), sin(dot(p,vec2(33332.5,18563.3))))) *323434.34344);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
   //生成屏幕UV (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    uv *= 10.0;//横向纵向都扩大10倍
    vec2 ipos = floor(uv);  // 整数部分组成二维数组：网格的坐标
    vec2 fpos = fract(uv);  // 小数部分组成二维数组：网格内的UV
    // 通过坐标，生成星星的uv坐标
    vec2 targetPoint = random2(ipos);    

    float speed = 0.2;
    targetPoint = 0.5 + 0.4*sin(iTime*speed + 6.2831*targetPoint);//动起来
    float dist = length(fpos - targetPoint);//当前uv坐标到星星uv坐标的距离
    float brightness = sin(iTime*speed + 6.2831*targetPoint.x);//当前明度
    vec3 color = vec3(1. - step(0.013, dist))*brightness;

    fragColor = vec4(color,1.0);
}