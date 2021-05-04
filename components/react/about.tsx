import React from 'react'
import baseStyles from '../../styles/modules/common/base.module.scss'
import aboutStyles from '../../styles/modules/about/index.module.scss'
import gsap from "gsap"
// SSRモード（サーバー上）では使えないためこの条件分岐
const ScrollTrigger = process.browser ? require("gsap/ScrollTrigger") : undefined
process.browser && gsap.registerPlugin(ScrollTrigger)

// SSRモード（サーバー上）では使えないためこの条件分岐
const ScrollToPlugin = process.browser ? require("gsap/ScrollToPlugin") : undefined
process.browser && gsap.registerPlugin(ScrollToPlugin)

interface Props {
  data: {
    name: string,
    name_image: {
      url: string
    }
  }
}

class About extends React.Component<Props> {

  blocks: HTMLElement[]

  constructor({data}) {
    super({data})

    this.blocks = []
  }

  // タイトルが見えたときになんかする
  onReadyTitle (node) {
    // gsap.to(node, {
    //   scrollTrigger: node,

    // })
  }

  componentDidMount() {
    if(this.blocks.length == 0) return

    for(const i in this.blocks) {
      console.log(this.blocks[i]);
      if(!this.blocks[i]) continue

      gsap.to(this.blocks[i], {
        scrollTrigger: {
          trigger: this.blocks[i],
          start: "top bottom",
          markers: false,
          onEnter: () => {
            document.addEventListener("mousewheel", this.handleScroll, {passive: false})
            document.addEventListener("touchmove", this.handleScroll, {passive: false})
            gsap.to(window, {scrollTo: this.blocks[i], duration: 1.5, ease: "sine.inOut", onComplete: () => {
              document.removeEventListener("mousewheel", this.handleScroll)
              document.removeEventListener("touchmove", this.handleScroll)
            }})
          },
          onLeaveBack: () => {
          }
        },
      })

    }

  }

  handleScroll = (e) => {
    e.preventDefault()
  }

  render() {

    return (
      <>

        <div className={aboutStyles.info__block} ref={node => this.blocks[0] = node}>
          <h2>arata matsumoto</h2>
          <br/>
        </div>

        <div className={aboutStyles.info__block} ref={node => this.blocks[1] = node}>
          <h3 ref={this.onReadyTitle}>about me</h3>
          <p>・ 2000.11.29 (20), born in Hyogo</p>
          <p>・ front end developer / backpacker</p>
          <p>・ STARRYWORKS inc. ( full time )</p>
          <p>・ osaka univercity of arts ( currently attending )</p>
          <br/>
        </div>

        <div className={aboutStyles.info__block} ref={node => this.blocks[2] = node}>
          <h3 ref={this.onReadyTitle}>lang</h3>
          <br/>

          <h4>javascript</h4>
          <p>・ React.js</p>
          <p>・ Next.js</p>
          <p>・ pixi.js</p>
          <p>・ three.js</p>
          <br/>

          <h4>C++</h4>
          <p>・ openframeworks</p>
          <p>・ GLSL</p>
          <p>・ Arduino</p>
          <br/>

          <h4>C#</h4>
          <p>・ Unity</p>
          <br/>
        </div>

      </>
    )
  }
}

export default About