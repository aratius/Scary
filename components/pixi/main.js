import { useState } from 'react'
import { Stage } from '@inlet/react-pixi'
import RotateText from './components/text'


export default function Pure () {

  return (
    <Stage
        options={{ backgroundAlpha: 0 }}
    >
      <RotateText/>
    </Stage>
  )

}