import React from 'react'
import Link from 'next/link'
import Base from '../components/react/base'
import Works from '../components/react/works'
import { getWorks } from '../components/api/works'
import styles from '../styles/modules/top.module.scss'
import Shuffle from 'shuffle-text'

export default class Home extends Base {

  //ページタイトル
  get title () {
    return 'TOP'
  }

  //背景のサークルの座標 
  get circlePos() {
    return {x: 100, y: 500}
  }

  componentDidMount() {
    this.shuffleText = new Shuffle(this.lead)
    this.shuffleText.start()
  }
  
  renderChild = () => {
    const data = this.props.works
    return (
      <>
        <div className={styles.lead__container}>
          <h1 ref={node => this.lead = node}>living too fast</h1>
        </div>
        <div className={styles.main__container}>
          <Works data={data}/>
          <div className={styles.about__container}>
            <img src="./assets/images/600x400.png"/>
            <div className={styles.about__content}>
              <p>ダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストですこれはダミーテキストです</p>
              <div className={styles.about__btn__container}>
                <Link href="/about">about</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

//getStaticPropsはビルド時にAPIとかの動的なデータを取りにいく フロントではなくサーバーの段階でこれが実行される SSGの肝と言っても過言ではないみたい
export async function getStaticProps(context) {
  console.log("hello world")  //サーバー側で実行される 開発時はコマンドラインに出力される

  const works = await getWorks()
  return {props: {works}}
}
