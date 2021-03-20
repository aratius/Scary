import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'
import { Texture } from 'pixi.js';

export default function RotatingText() {
    const [rotation, setRotation] = useState(0)
    useTick(delta => {
        setRotation(rotation + 0.01)
    })

    const texture = Texture.from('/assets/images/fishes/fish_1.png')
    return (
       <Sprite
          texture={texture}
          position={[100, 200]}
          rotation={rotation}
          anchor={0.5}
      />
    )
}