import { Filter } from 'pixi.js'
import fragGLSL from './shader/fishCirve.frag'
import vertGLSL from './shader/allVertex.vert'

export default class FishCirveFilter extends Filter {
  constructor(waveTexture){
    super(
      vertGLSL,
      fragGLSL,
      {
        waveTexture: waveTexture
      }
    )
  }
}