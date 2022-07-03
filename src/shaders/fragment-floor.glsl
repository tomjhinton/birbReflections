

uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform sampler2D uTexture4;
uniform sampler2D uTexture5;

// uniform float uValueA;
// uniform float uValueB;
// uniform float uValueC;
uniform float uValueA;
uniform float uValueB;
uniform float uValueC;
uniform float uValueD;
uniform vec4 uDate;

uniform vec2 u_resolution;
uniform float uTime;
  varying vec2 vUv;

const float PI = 3.1415926535897932384626433832795;
const float TAU = PI * 2.;
const float HALF_PI = PI * .5;

float wiggly(float cx, float cy, float amplitude, float frequency, float spread){

  float w = sin(cx * amplitude * frequency * PI) * cos(cy * amplitude * frequency * PI) * spread;

  return w;
}


void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .25));
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .25));
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .25));

}


void uvRipple(inout vec2 uv, float intensity){

	vec2 p = uv -.5;


    float cLength=length(p);

     uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

}

float smoothMod(float x, float y, float e){
    float top = cos(PI * (x/y)) * sin(PI * (x/y));
    float bot = pow(sin(PI * (x/y)),2.);
    float at = atan(top/bot);
    return y * (1./2.) - (1./PI) * at ;
}


 vec2 modPolar(vec2 p, float repetitions) {
    float angle = 2.*3.14/repetitions;
    float a = atan(p.y, p.x) + angle/2.;
    float r = length(p);
    //float c = floor(a/angle);
    a = smoothMod(a,angle,033323231231561.9) - angle/2.;
    //a = mix(a,)
    vec2 p2 = vec2(cos(a), sin(a))*r;

   p2 += wiggly(p2.x + uTime * .05, p2.y + uTime * .05, 2., 4., 0.05);



    return p2;
}

  float stroke(float x, float s, float w){
  float d = step(s, x+ w * .5) - step(s, x - w * .5);
  return clamp(d, 0., 1.);
}

 //	Classic Perlin 2D Noise
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}


vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 *
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}



vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}

  vec2 tile(vec2 st, float _zoom){
    float vTime = uTime;
    st *= _zoom;

    return fract(st);
}

  vec2 rotateUV(vec2 uv, vec2 pivot, float rotation) {
  mat2 rotation_matrix=mat2(  vec2(sin(rotation),-cos(rotation)),
                              vec2(cos(rotation),sin(rotation))
                              );
  uv -= pivot;
  uv= uv*rotation_matrix;
  uv += pivot;
  return uv;
}

void coswarp2(inout vec2 trip, float warpsScale ){

  float vTime = uTime;
  trip.xy += warpsScale * .1 * cos(3. * trip.yx + (vTime * .25));
  trip.xy += warpsScale * .05 * cos(11. * trip.yx + (vTime * .25));
  trip.xy += warpsScale * .025 * cos(17. * trip.yx + (vTime * .25));

}



void main() {
	vec2 uv = vUv;

  float vTime = uTime * .5 ;


  vec2 uv2 = uv;
   vec2 uv3 = uv;



  uvRipple(uv3, .2);

  uv = rotateUV(uv, vec2(.55), -PI * vTime * .05);

    uv2 = rotateUV(uv, vec2(.45), PI * vTime * .05);

  // uv = mix(
  //   mix(modPolar(uv2-.5, 12.), modPolar(uv-.25, 9.), fract(uv.x * 9. + cos(vTime)) + fract(uv2.y * 9. + sin(vTime))),
  //   mix(modPolar(uv2-.75, 12.), modPolar(uv-.45, 9.), fract(uv2.x * 15. * sin(vTime * .2)) + fract(uv.y * 15. * sin(vTime * .2))), sin(vTime));

  coswarp2(uv, 3.);


  rotateTilePattern(uv );







	vec3 color = mix(vec3(uv.x, uv.y, 1.), vec3(uv.y, uv.x, uv3.x), uv3.x *sin(vTime));

  uvRipple(color.rg, 1.);

  uvRipple(color.gb, color.r);

 coswarp(color, 3.);




    gl_FragColor = vec4(vec3(color.r, color.g, color.b), 1.0);
}
