import { Filter } from 'pixi.js'
import fragGLSL from './shader/fishCirve.frag'
import vertGLSL from './shader/allVertex.vert'

export default class FishCirveFilter extends Filter {
  constructor(){
    let frag = fragGLSL
    let vert = vertGLSL

    super(
      vert,
      frag,
      {}
    )
  }
}