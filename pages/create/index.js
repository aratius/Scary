import React from 'react'
import Base from '../../components/react/base'
import { getWorks } from '../../components/api/works'
import baseStyles from '../../styles/modules/common/base.module.scss'
import _Create from '../../components/react/create'

export default function Create () {

  return (
    <Base
      circlePos={{x: 10, y: 100}}
      title="CREATE"
    >
      <div className={baseStyles.main__container}>
        <h1>CREATE</h1>
        <_Create/>
      </div>
    </Base>
  )
}
