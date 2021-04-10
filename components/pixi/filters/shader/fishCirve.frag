varying vec2 vTextureCoord;
varying vec2 vScreenCoord;
uniform sampler2D uSampler;

uniform sampler2D waveTexture;
uniform sampler2D containerTexture;
uniform float u_animTime;

const int oct = 8;
const float per = 0.5;
const float PI = 3.14159265;

//---------------perlinNoise---------------
float random(vec2 v)
{
	// 0.0..1.0の乱数を返す
	return fract(sin(dot(v, vec2(12.9898, 78.233))) * 43758.5453);
}

float animation(float f)
{
	//0.0..1.0をsin波の周期で繰り返す
	return sin(f * 6.283 + u_animTime * 2.0) * 0.5 + 0.5;
}

vec2 random2(vec2 v)
{
	return vec2(random(v), random(v + vec2(0.5, 0.5)));
}

vec2 animation2(vec2 v)
{
	return vec2(animation(v.x), animation(v.y));
}

float interpolation(float f)
{
	/* 0.0..1.0の補間式、5次のものがアーティファクト少なくていいらしい */
	/*return f * f * (3.0 - 2.0 * f);*/
	return f * f * f * (f * (6.0 * f - 15.0) + 10.0);
}

float noise_(vec2 uv)
{
	vec2 i_uv = floor(uv * 5.0);
	vec2 f_uv = fract(uv * 5.0);
	vec2 v1 = animation2(random2(i_uv + vec2(0.0, 0.0))) * 2.0 - 1.0;
	vec2 v2 = animation2(random2(i_uv + vec2(1.0, 0.0))) * 2.0 - 1.0;
	vec2 v3 = animation2(random2(i_uv + vec2(0.0, 1.0))) * 2.0 - 1.0;
	vec2 v4 = animation2(random2(i_uv + vec2(1.0, 1.0))) * 2.0 - 1.0;
	float o = mix(
		mix(dot(v1, f_uv - vec2(0.0, 0.0)), dot(v2, f_uv - vec2(1.0, 0.0)), interpolation(f_uv.x)),
		mix(dot(v3, f_uv - vec2(0.0, 1.0)), dot(v4, f_uv - vec2(1.0, 1.0)), interpolation(f_uv.x)),
		interpolation(f_uv.y)) * 0.5 + 0.5;
	return o;
}

void main(void){
  // TODO: スクリーンとテクスチャコードのずれ問題を理解したい
  vec2 pos = vScreenCoord;
  vec2 cord = vTextureCoord;

  vec4 waveMap = texture2D(waveTexture, pos);  //こっちはpos


  vec2 t = cord.xy;
  float noiseAmplitudeAmount = waveMap.a;
  float n = noise_(t*6.);
  float noise = (n * 2.) - 1.0;  // -1 ~ 1
  float noiseAmount = waveMap.x * 0.1 + 0.005;
  vec2 noiseCord = vec2(noise*noiseAmount + cord.x, noise*noiseAmount + cord.y);

  vec4 color = texture2D(uSampler, noiseCord);  //こっちはcord

  // color = vec4(vec3(noise), 1.);

  gl_FragColor=color;

}