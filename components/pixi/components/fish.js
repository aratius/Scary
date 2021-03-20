import { useEffect, useState } from 'react'
import { AnimatedSprite, Sprite, useTick } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js';
import { Loader, Texture } from 'pixi.js'
import Vector2 from '../common/vector2'
import { baseImagePath } from '../common/config'

export default function Fish(props) {
  const [rotation, setRotation] = useState(0)

  // アップデート処理
  useTick(delta => {
    setRotation(rotation + 0.01)
  })

  return (
    <>
      <AnimatedSprite
        textures={props.frames}
        position={props.position}
        isPlaying={true}
        initialFrame={0}
        animationSpeed={0.1}
        anchor={0.5}
        width={props.size}
        height={props.size}
        tint={0x000000}
      />
    </>
  )
}