import MultiClass from '@kbravh/multi-class'
import Events from './_events'
import Subscriptions from './_subscriptions'
import Cache from './_cache'
import { connectionStatus } from './_common'

export default class extends MultiClass(Events, Subscriptions, Cache) {
	_address 
	_port
	//_apiBase = '/'
	_connectionPath = '/'
	#_status = connectionStatus.DISCONNECTED
	_events = {}
	_subscriptions = {}

	set status(status){
		if(Object.values(connectionStatus).includes(status)){
			this.#_status = status
			this.dispatch('status', status)
		}
	}

	get status(){
		return this.#_status
	}

	// ping the connection path to test connection 
	async connect(address, port){
		this.status = connectionStatus.CONNECTING
		this._address = address
		this._port = port

		return await this.query(this._connectionPath)
			.then(data => {
				this.status = connectionStatus.CONNECTED
				this.onConnection()
				this.dispatch('connected', data)
				return data
			})
			.catch(e => {
				this.status = connectionStatus.ERROR
				return null
			})
	}

	//
	onConnection(){}

	async query(path, method='GET', params={}){
		const cached = this.cache.get(path)

		if(cached){
			return cached
		}else{
			return await this._query(path, method, params)
				.then(data => {
					this.cache.set(path, data)
					return data
				})
				.catch(e => {
					this.dispatch('error', e.message)
					throw new Error(e.message)
					//throw e
				})
		}
	}
}
