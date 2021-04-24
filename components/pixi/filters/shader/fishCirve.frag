varying vec2 vTextureCoord;
varying vec2 vScreenCoord;
uniform sampler2D uSampler;

uniform sampler2D waveTexture;
uniform float u_animTime;
uniform vec2 u_resolution;

const int oct = 8;
const float per = 0.5;
const float PI = 3.14159265;
const float power = 0.2;
const float defaultPower = 0.01;

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
	float amplitude = u_resolution.x / 40.;  //ノイズの細かさ

	vec2 i_uv = floor(uv * amplitude);
	vec2 f_uv = fract(uv * amplitude);
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
  vec2 cord = vTextureCoord;

	vec2 r = u_resolution / min(u_resolution.x, u_resolution.y);
	vec2 pos = cord * r;  // オレオレ正規化 0, 0 は依然右上です

  vec4 waveMap = texture2D(waveTexture, cord);  //こっちはpos

	// noise----------
  vec2 t = pos.xy;
  float n = noise_(t);
  float noise = (n * 2.) - 1.0;  // -1 ~ 1
  float noiseAmount = waveMap.x * power + defaultPower;
  vec2 noiseCord = vec2(noise*noiseAmount + pos.x, noise*noiseAmount + pos.y);
	// noise----------

	noiseCord /= r;  //正規化した座標を戻す
  vec4 color = texture2D(uSampler, noiseCord);  //こっちはcord

	vec4 noiseColor = vec4(vec3(noise), 1.);
	vec4 blend = vec4(noiseColor * (waveMap.a)*0.1 + color * 0.9);

  gl_FragColor=blend;

}