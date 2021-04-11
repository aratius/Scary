import { Loader } from 'pixi.js'

export function getRadian(degree) {
  return degree / 360 * 2 * Math.PI
}

export async function loadTextures (jsonUrl) {
  const _textures = []
  console.log("hello");
  return new Loader().add(jsonUrl).load()

}