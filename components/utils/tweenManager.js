import gsap from "gsap"

// SSRモード（サーバー上）では使えないためこの条件分岐
const ScrollToPlugin = process.browser ? require("gsap/ScrollToPlugin") : undefined
process.browser && gsap.registerPlugin(ScrollToPlugin)


export default class TweenManager {

  static popUp(element, duration=0.3, delay=0, ease="elastic.out") {
    if(!element) return
    element.style.zIndex = 200;  // ホバー中はcanvasの上に重なる (魚が下を潜る)
    element.style.opacity = 0.95
    gsap.timeline().fromTo(element,{scale: 1}, {scale: 1.2, duration: duration, delay: delay, ease: ease})
  }

  static popDown(element, duration=0.3, delay=0, ease="elastic.out") {
      if(!element) return
      element.style.zIndex = 1
      gsap.timeline().to(element, {scale: 1, duration: duration, delay: delay, ease: ease})
  }


  static scrollToTop(duration){
    if(process.browser) {
      gsap.to(window, {scrollTo: {y : 0}, duration: duration})
    }
  }

  static async fadeOut(element, duration) {
    if(!element) return
    await gsap.fromTo(element, {opacity: 1}, {opacity: 0, duration: 0.5})
  }

  static async fadeIn(element, duration) {
    if(!element) return
    await gsap.fromTo(element, {opacity: 0}, {opacity: 1, duration: 0.5})
  }
}