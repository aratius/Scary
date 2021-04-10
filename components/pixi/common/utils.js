import { Loader } from 'pixi.js'

export function getRadian(degree) {
  return degree / 360 * 2 * Math.PI
}

export async function loadTextures (jsonUrl) {
  console.log("hello");
  const textures = []
  await new Loader().add(jsonUrl).load((loader, resources) => {
    for(const key in resources[jsonUrl].textures) textures.push(resources[jsonUrl].textures[key])
  })
  return textures
}