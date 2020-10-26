import { v4 as uuidv4 } from 'uuid';
import { get, set, unset } from 'lodash'

const defaultPollInterval = 5000

// subscribe to api calls
export default class{
	_subscriptions = {}

	// add poll event
	subscribe(url, cb=()=>{}, timeout=defaultPollInterval){
		const id = uuidv4()

		// add polling interval if none?
		if(!get(this._subscriptions, url)){
			set(this._subscriptions, `${url}.interval`, setInterval(() => this.triggerSubscriptionCallback(url), timeout))
		}

		// add event callback
		set(this._subscriptions, `${url}.events.${id}`, cb)

		// trigger initial callback
		this.triggerSubscriptionCallback(url)
		
		return {
			unsubscribe: () => this.unsubscribe(url, id)
		}
	}

	unsubscribe(path, id){
		const event = get(this._subscriptions, `${path}.events.${id}`)

		if(event){
			unset(this._subscriptions, `${path}.events.${id}`)

			// no move events? remove event group
			if(Object.values(get(this._subscriptions, `${path}.events`)).length <= 0){
				const interval = get(this._subscriptions, `${path}.interval`)
				clearInterval(interval)
				unset(this._subscriptions, path)
			}
		}
	}

	// itterate through poll group and call all events
	triggerSubscriptionCallback(url){
		this.query(url)
			.then(result => {
				if(result){
					const ids = Object.keys(get(this._subscriptions, `${url}.events`, {}))
					ids.forEach(id => {
						const cb = get(this._subscriptions, `${url}.events.${id}`)
						cb(result, {
							unsubscribe: () => this.unsubscribe(url, id)
						})
					})
				}
			})
			.catch((e) => {
				
				const ids = Object.keys(get(this._subscriptions, `${url}.events`, {}))
				ids.forEach(id => {
					const cb = get(this._subscriptions, `${url}.events.${id}`)
					this.unsubscribe(url, id)
					cb(
						null, 
						{
							unsubscribe: () => this.unsubscribe(url, id)
						},
						true
					)
				})

				//throw e
			})
	}
}
