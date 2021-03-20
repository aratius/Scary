import { Stage } from '@inlet/react-pixi'
import Vector2 from './common/vector2'
import Fish from './components/fish'
import Spritesheet from './common/spriteSheet'
import { baseImagePath } from './common/config'
import { createRef } from 'react'

export default function Pure () {

  const stage = createRef(null)

  return (
    <Stage
      options={{ backgroundAlpha: 0 }}
      width={window.innerWidth}
      height={window.innerHeight}
      ref={stage}
    >
      <Spritesheet url={`${baseImagePath}fishImages.json`}>
        {/* {fishes} */}
        {frames => {
          const props = {size: 20, frames}
          console.log(window.innerWidth)
          return (
            <>
              <Fish {...props} position={new Vector2(Math.random()*300, Math.random()*300)}/>
              <Fish {...props} position={new Vector2(Math.random()*300, Math.random()*300)}/>
              <Fish {...props} position={new Vector2(Math.random()*300, Math.random()*300)}/>
              <Fish {...props} position={new Vector2(Math.random()*300, Math.random()*300)}/>
              <Fish {...props} position={new Vector2(Math.random()*300, Math.random()*300)}/>
              <Fish {...props} position={new Vector2(400, 100)}/>
            </>
          )
        }
      }
      </Spritesheet>
    </Stage>
  )

}