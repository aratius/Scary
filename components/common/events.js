import { EventEmitter } from 'events'

export class Events {
  static OnImgLoad = "onimgload"
}

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