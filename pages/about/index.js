import React from 'react'
import Link from 'next/link'
import Base from '../../components/react/base'
import _Works from '../../components/react/works'
import baseStyles from '../../styles/modules/common/base.module.scss'

export default function About () {

  return (
    <Base
      circlePos={{x: 100, y: 0}}
      title="WORKS"
    >
      <div className={baseStyles.main__container}>
        <h1>ABOUT</h1>
      </div>
    </Base>
  )
}
