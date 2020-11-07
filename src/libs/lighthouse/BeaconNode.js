import Lighthouse from './_lighthouse'
import { metricStatus } from './_common'

const BeaconNode = class extends Lighthouse{
	
	_connectionPath = '/eth/v1/config/spec'

	#_to_cache = {
		'/config/spec': -1
	}

	datapoints = {
		disk: [],
		cpu: [],
		memory: [],
		network: [],
		p2p: [],
	}

	constructor(){
		super()
		this.cache.configure(this.#_to_cache)
	}

	async _query(path, method='GET'){
		return await fetch(`${this._address}:${this._port}${path}`)
			.then(response => response.json())
			.then(({data, code, message}) => {
				
				// bad code? error
				if(code && code !== 200){
					throw new Error(message)
				}

				return data
			})
	}

	onConnection(){
		// poll beacon node sync status
		this.subscribe(
			'/eth/v1/node/syncing', 
			(data, cbs, error) => {
				if(error){
					cbs.unsubscribe()
					return;
				}
				this.dispatch('health.beacon', {
					...data,
					total_slots: +data?.head_slot + +data?.sync_distance,
				})
			},
			process.env.REACT_APP_HEALTH_POLLING_INTERVAL
		)

		// poll eth1 sync status
		this.subscribe(
			'/lighthouse/eth1/syncing', 	
			(data, cbs, error) => {
				if(
					error || 
					(
						!data?.head_block_number && 
						!data?.head_block_timestamp && 
						!data?.latest_cached_block_number
					)
				){
					cbs.unsubscribe()
				}

				this.dispatch('health.eth', data)
			},
			process.env.REACT_APP_HEALTH_POLLING_INTERVAL
		)

		// subscribe to lighthouse health
		this.subscribe(
			'/lighthouse/health', 
			(data, cbs, error) => {
				if(error){
					cbs.unsubscribe()
					return;
				}

				this.processHealth(data)
			},
			process.env.REACT_APP_HEALTH_POLLING_INTERVAL
		)
	}

	processHealth(data){
		this.dispatch('health.disk', {
			...data.database_status,
			...data.chain_database,
			datapoints: this.processDatapoints('disk', data.database_status.gauge_pct)
		})

		this.dispatch('health.cpu', {
			...data.cpu_status,
			load_1: data.sys_loadavg_1,
			load_5: data.sys_loadavg_5,
			load_15: data.sys_loadavg_15,
			datapoints: this.processDatapoints('cpu', data.sys_loadavg_5)
		})

		this.dispatch('health.memory', {
			...data.memory_status,
			available: data.sys_virt_mem_available,
			free: data.sys_virt_mem_free,
			percent: data.sys_virt_mem_percent,
			total: data.sys_virt_mem_total,
			used: data.sys_virt_mem_used,
			datapoints: this.processDatapoints('memory', data.memory_status.gauge_pct)
		})

		this.dispatch('health.network', {
			...data.network,
			datapoints: this.processDatapoints('network', data.network.rx_bytes)
		})

		this.dispatch('health.p2p', {
			...data.p2p_status,
			datapoints: this.processDatapoints('p2p', data.p2p_status.gauge_pct)
		})

		this.dispatch('health.eth', {
			...data.eth1_status,
		})
	}

	processDatapoints(key, value){
		const datapoints = this.datapoints[key].push(value)
		this.datapoints[key].length > 10 && this.datapoints[key].shift()
		return this.datapoints[key]
	}
}

const instance = new BeaconNode();
export default instance;