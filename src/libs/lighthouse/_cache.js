import moment from 'moment'

let _toCache = []
let _cached = {}

export default class{
	get cache(){
		return {
			configure: this._configure,
			set: this._set,
			get: this._get,
			clear: this._clear,
			clearAll: this._clearAll,
		}
	}

	_configure(items){
		_toCache = items
	}

	_set(key, val){
		
		
		if(Object.keys(_toCache).includes(key)){
			_cached[key] = {
				expiry: _toCache[key] === -1 ? -1 : moment().add(_toCache[key], 'ms').unix(),
				data: val
			}
		}
	}

	_get(key){
		const hit = _cached[key]

		if(hit){
			// forever OR still before expiry time
			if(
				hit.expiry === -1 || 
				moment().unix() < hit.expiry
			){
				return hit.data
			}
			// clear
			else{
				delete _cached[key]
			}
		}

		return null
	}

	_clear(key){
		delete _cached[key]
	}

	_clearAll(){
		_cached = {}
	}
}
