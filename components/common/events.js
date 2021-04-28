import { EventEmitter } from 'events'

export class Events {
  static OnImgLoad = "onimgload"
}

/**
 * 離れたコンポーネント同士のやり取りは直接参照を持つのではなくて
 * EventEmitterを介しておこなう
 */
class EventManager extends EventEmitter {

  /**
   *
   * @param {string} key
   */
  EmitEvent(key) {
    this.emit(key)
  }

}

const _EventManager = new EventManager()
export default _EventManager