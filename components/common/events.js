import { EventEmitter } from 'events'

export class Events {
  static OnImgLoad = "onimgload"
  static OnClickLink = "onclicklink"
}

/**
 * 離れたコンポーネント同士のやり取りは直接参照を持つのではなくて
 * EventEmitterを介しておこなう
 * シングルトン
 */
class EventManager extends EventEmitter {

  /**
   *
   * @param {string} key
   */
  EmitEvent(key, callback=()=>{console.log("hello cb")}) {
    this.emit(key, callback)
  }

}

const _EventManager = new EventManager()
export default _EventManager