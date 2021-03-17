import gsap from "gsap"

export default class TweenManager {


  static popUp(element, duration=0.3, delay=0, ease="elastic.out") {
    if(!element) return
    element.style.zIndex = 100;
    gsap.timeline().to(element, {scale: 1.2, duration: duration, delay: delay, ease: ease})
  }

  static popDown(element, duration=0.3, delay=0, ease="elastic.out") {
      if(!element) return
      element.style.zIndex = 1
      gsap.timeline().to(element, {scale: 1, duration: duration, delay: delay, ease: ease})
  }

}