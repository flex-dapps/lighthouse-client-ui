import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { get, set, unset, isEqual, pick, merge } from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5'
import { JSONCycle } from '@util/helpers';

const StoreStatus = {
	INITIALIZING: 'INITIALIZING',
	INITIALIZED: 'INITIALIZED',
	ERROR: 'ERROR',
}

const stores = {}

const storeController = (
		name, 
		{
			initialState={}, 
			hydration={}, 
			triggers={}, 
			setters={}, 
			subscribers={},
			persistent=[],
			history,
			init=s=>s.state, 
			onUpdate=()=>{}
		}
	) => {
		stores[name] = {
			name: name,
			status: StoreStatus.INITIALIZING,
			initialState: JSON.parse(JSON.stringify(initialState)),
			preInitState: {},
			state: initialState,
			hydration: hydration,
			triggers: triggers,
			setters: setters,
			persist: true,
			persistent: persistent,
			stateSubscriptions: {},
			keySubscriptions: {},
			stateHash: null,
			onUpdate: onUpdate,
			history: history,
			init: () => {
				// hydrate from cache
				let cachedState = stores[name].cache.hydrate()

				
				//stores[name].state = {...stores[name].state, ...cachedState||{}, ...stores[name].preInitState}
				// NOTE: changed to lodash merge so we can deep merge object
				merge(stores[name].state, cachedState||{}, stores[name].preInitState)

				// init with state
				let initState = init(stores[name].buildCallbackObject(['hydrate']))
				//stores[name].state = {...stores[name].state, ...initState||{}}
				// NOTE: changed to lodash merge so we can deep merge object
				merge(stores[name].state, initState||{})

				// init all subscribers passed as props
				Object.keys(subscribers).forEach(key => stores[name].subscriptions.subscribe(key, subscribers[key]))

				// fire all global subs
				stores[name].subscriptions.fire('__GLOBAL')

				// fire onUpdate CB
				stores[name].subscriptions._triggerCallback(stores[name].onUpdate, stores[name].buildCallbackObject())

				// set status
				stores[name].status = StoreStatus.INITIALIZED
			},
			hydrate: async (action, callback=()=>{}) => {
				
				const func = get(stores[name].hydration, action)
				if(typeof func === "function") {
					await func(stores[name].buildCallbackObject())
					
					if(typeof callback === "function") {
						callback(stores[name].buildCallbackObject())
					}
				}
			},
			
			trigger: (action, payload) => new Promise(async resolve => {
				const func = get(stores[name].triggers, action)
				
				if(typeof func === "function") {
					const result = await func(
						stores[name].buildCallbackObject(),
						payload
					)

					resolve(
						stores[name].buildCallbackObject(), 
						result
					)
				}
			}),
			_state: {
				set: async (action, payload, callback) => {
					const func = get(stores[name].setters, action)
					let newState = null

					if(typeof func === "function"){
						newState = await func(stores[name].buildCallbackObject(), payload)
					}else{
						newState = set(stores[name].state, action, payload)
					}

					stores[name]._state._update(newState, action, payload, callback)
				},
				unset: (key, callback) => {
					unset(stores[name].state, key)
					stores[name]._state._update(stores[name].state, key, callback)
				},
				_update: (newState, action, payload, callback=()=>{}) => {
					const oldStore = JSONCycle(stores[name])
					const oldStateHash = oldStore.stateHash

					// update the store state
					stores[name].state = newState || stores[name].state

					// get new state hash
					//const newStateHash = md5(JSON.stringify(stores[name].state)) // REPLACTED WITH JSONCycle 8 OCT 2020
					const newStateHash = md5(JSON.stringify(JSONCycle(stores[name].state)))


					// if the state has changed, update
					if(newStateHash !== oldStateHash){

						stores[name].stateHash = newStateHash

						//fire set/trigger update callback
						typeof callback === 'function' && callback(stores[name].buildCallbackObject())

						//fire global subs
						stores[name].subscriptions.fire('__GLOBAL')

						// fire action subs
						stores[name].subscriptions.fire(`__KEY.${action}`, get(stores[name].state, action, null))

						// fire onUpdate callback
						stores[name].subscriptions._triggerCallback(stores[name].onUpdate, stores[name].buildCallbackObject())

						if(payload && stores[name]?.persist === true && stores[name]?.persistent.includes(action)){
							stores[name].cache.set(action, payload)
						}
					}
				}
			},
			cache: {
				hydrate: () => {
					const cached = {}
					for (var i = 0; i < stores[name].persistent.length; i++) {
						const key = stores[name].persistent[i]
						let val = stores[name].cache.get(key)

						if(val === 'true') val = true
						if(val === 'false') val = false

						if(val !== 'null' && val !== null){
							set(cached, key, val)
						}
					}
					return cached
				},
				set: (key, value) => localStorage.setItem(`${name}.${key}`, value),
				get: (key) => localStorage.getItem(`${name}.${key}`),
				clear: (key) => localStorage.removeItem(`${name}.${key}`),
				persist: (on=true) => {
					stores[name].persist = on||true
					stores[name].persistent.forEach(key => {
						if(on === true){
							stores[name].cache.set(key, get(stores[name].state, key))
						}else{
							stores[name].cache.clear(key)
						}
					})
				}

			},
			subscriptions: {
				// subscriptions to when state is updated
				__GLOBAL: {}, 

				// subscriptions to a certain state key,
				__KEY: {},

				// create a subscription
				subscribe: (key, cb=()=>{}, once=false) => {
					const id = uuidv4()
					let type = '__KEY'
					let path = null

					// global subscription
					if(typeof key === 'function'){
						type = '__GLOBAL'
						cb = key
						path = type
					}
					// key subscription
					else{
						path = `${type}.${key}`
					}

					let pathWithId = `${path}.${id}`

					// create subscription obj
					const subscription = {
						cb: cb,
						once: once,
						type: type,
						unsubscribe: () => stores[name].subscriptions.unsubscribe(pathWithId)
					}

					// store subscription
					stores[name].subscriptions = set(stores[name].subscriptions, pathWithId, subscription)

					// if it's a key subscription, check it has a non-default value
					if(type === '__KEY'){
						const initialVal = get(stores[name].initialState, key, null)
						const currentVal = get(stores[name].state, key, null)

						if(!isEqual(initialVal, currentVal)){
							stores[name].subscriptions._triggerCallback(cb, currentVal)
						}
					}

					return subscription
				},
				// remove a subscription
				unsubscribe: key => {
					unset(stores[name].subscriptions, key)
				},
				// fire all subscriptions by key
				fire: (key, payload) => {
					stores[name].subscriptions._triggerFire(key, payload)

					// fire parent subs and parent actions subs
					const keyParts = key.split('.');
					if(keyParts.length >= 3){
						// remove last item
						keyParts.splice(-1, 1)
						const parentPath = [...keyParts].join('.')
						
						// remove first item
						keyParts.splice(0, 1)
						const parentPayload = stores[name].state[keyParts.join('.')]
						
						// fire 
						stores[name].subscriptions._triggerFire(parentPath, parentPayload)
					}
				},
				_triggerFire: (key, payload) => {
					const subscriptions = get(stores[name].subscriptions, key, {})

					// if(key === `__GLOBAL`){
					// 	//console.log(name, payload, stores[name].state.rates, subscriptions)
					// } 

					Object.keys(subscriptions).forEach(id => {
						if(subscriptions[id]?.cb){
							const { cb, once } = subscriptions[id]
							
							stores[name].subscriptions._triggerCallback(cb, payload)
							
							// remove if one time only
							if(once === true) stores[name].subscriptions.unsubscribe(key)
						}
					})

				},
				_triggerCallback: (callback, payload) => {
					typeof callback === "function" && callback(
						payload,
						stores[name].buildCallbackObject()
					)
				}
			},
			buildCallbackObject: (additional=[]) => {
				return {
					__name: stores[name].name,
					__hash: stores[name].stateHash,
					state: stores[name].state,
					set: stores[name]._state.set,
					unset: stores[name]._state.unset,
					trigger: stores[name].trigger,
					hydrate: stores[name].hydrate,
					history: stores[name].history,
					cache: stores[name].cache,
					...pick(stores[name], additional)
				}
			}
		}

		stores[name].init()

		return stores[name] 
}

export const FetchStore = (name, config, history) => {
	name = name || 'store'
	return !stores[name] ? storeController(name, {...config, history}) : stores[name]
}

export default (name, config={}) => {
	const history = useHistory()
	const store = FetchStore(name, config, history)
	const [state, setState] = useState(store.state)

	useEffect(() => {
		const sub = store.subscriptions.subscribe((_, _store) => setState({..._store.state}))
		return () => sub.unsubscribe()
	}, []) // eslint-disable-line

	return {
		state: state, 
		set: (action, payload, cb) => store._state.set(action, payload, cb),
		unset: (key, cb) => store._state.unset(key, cb),
		trigger: async (action, payload, cb) => await store.trigger(action, payload, cb),
		subscribe: (key, cb) => store.subscriptions.subscribe(key, cb),
		history: history
	}
}