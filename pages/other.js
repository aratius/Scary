import React from "react";
import Link from 'next/link'
import Base from "../components/react/base";

export default class Other extends Base {

  //ページタイトル
  get title () {
    return 'OTHER'
  }

  //背景のサークルの座標 
  get circlePos() {
    return {x: 400, y: 200}
  }
  
  renderChild = () => {
    return (
      <>
        {/* <Works/> */}
        <h1>other page</h1>
        <Link href="/">main page</Link>
      </>
    )
  }
  
}