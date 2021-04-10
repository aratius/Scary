varying vec2 vTextureCoord;
varying vec2 vScreenCoord;
uniform sampler2D uSampler;

uniform sampler2D waveTexture;

void main(void){
  vec2 pos = vScreenCoord;
  vec2 cord = vTextureCoord;

  vec4 waveMap = texture2D(waveTexture, cord);

  vec4 color = texture2D(uSampler, cord);

  color.r = waveMap.a;

  gl_FragColor=color;
}