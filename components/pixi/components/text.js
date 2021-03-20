import { useEffect, useState } from 'react'
import { AnimatedSprite, Sprite, useTick } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js';
import { Loader, Texture } from 'pixi.js'
import { baseImagePath } from '../config'

const loader = PIXI.Loader.shared
const spritesheet = baseImagePath + "fishImages.json"

export default function RotatingText() {
  const [rotation, setRotation] = useState(0)
  const [fishFrames, setFrames] = useState([])

  /**
   * マウント後最初に実行
   * スプライトシートのローディング・Texture配列の作成
   */
  useEffect(() => {
    if(fishFrames[0] instanceof Texture) return  // すでにローディングしていればもういい
    if(loader.loading) return
    loader.add(spritesheet).load(( _ , resource) => {
      console.log(resource[spritesheet].data.frames)
      setFrames(
        Object.keys(resource[spritesheet].data.frames).map(frame => Texture.from(frame))
      )
    })
  },[])

  // アップデート処理
  useTick(delta => {
    setRotation(rotation + 0.01)
  })


  return (
    <>
    {fishFrames.length > 0 &&
      <AnimatedSprite
        textures={fishFrames}
        position={[300, 300]}
        isPlaying={true}
        initialFrame={0}
        animationSpeed={0.1}
        anchor={0.5}
        scale={[0.2, 0.2]}
        tint={0x000000}
      />
    }
    </>
  )
}