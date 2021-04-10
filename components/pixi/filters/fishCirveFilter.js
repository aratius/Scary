import { Filter } from 'pixi.js'
import fragGLSL from './shader/fishCirve.frag'
import vertGLSL from './shader/allVertex.vert'

export default class FishCirveFilter extends Filter {
  constructor(containerTexture, waveTexture){
    super(
      vertGLSL,
      fragGLSL,
      {
        containerTexture: containerTexture,
        waveTexture: waveTexture,
        u_animTime: 0
      }
    )
  }
}