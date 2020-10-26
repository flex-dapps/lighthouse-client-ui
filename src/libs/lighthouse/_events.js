import { v4 as uuidv4 } from 'uuid';
import { get, set, unset } from 'lodash'

// add event subscriptions to a class
export default class{
	_events = {}

	// add subscriber
	on(type, cb=()=>{}){

		const id = uuidv4()
		const path = `${type}.${id}`
		set(this._events, path, cb)

		return {
			unsubscribe: () => this.off(path)
		}
	}

	// remove subscriber
	off(path){
		unset(this._events, path)
	}

	// dispatch subscription event with payload
	dispatch(type, payload){
		Object.values(get(this._events, type, {}))
			.forEach(cb => typeof cb === 'function' && cb(payload))
	}

	deregisterEvents(){
		this._events = {}
	}
}