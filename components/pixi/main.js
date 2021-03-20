import { useState } from 'react'
import { Stage } from '@inlet/react-pixi'
import Fish from './components/fish'


export default function Pure () {

  return (
    <Stage
        options={{ backgroundAlpha: 0 }}
    >
      <Fish/>
    </Stage>
  )

}