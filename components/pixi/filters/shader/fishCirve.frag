varying vec2 vTextureCoord;
varying vec2 vScreenCoord;
uniform sampler2D uSampler;

void main(void){
  vec2 pos = vScreenCoord;
  pos.x += 0.5;

  gl_FragColor=texture2D(uSampler,pos);
}