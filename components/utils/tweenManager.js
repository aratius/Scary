import gsap from "gsap"

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

}