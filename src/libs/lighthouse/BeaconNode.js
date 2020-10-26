import Lighthouse from './_lighthouse'
import { metricStatus } from './_common'

const BeaconNode = class extends Lighthouse{
	
	_connectionPath = '/eth/v1/config/spec'

	#_to_cache = {
		'/config/spec': -1
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
		this.subscribe('/eth/v1/node/syncing', (data, cbs, error) => {
			if(error){
				this.dispatch('beacon.health', {
					message: 'Beacon sync error',
					status: metricStatus.ERROR
				})
				return;
			}
			this.processBeaconData(data)
		})

		this.subscribe('/lighthouse/eth1/syncing', (data, cbs, error) => {
			if(
				error || 
				(
					!data?.head_block_number && 
					!data?.head_block_timestamp && 
					!data?.latest_cached_block_number
				)
			){
				this.dispatch('eth.health', {
					percent: data?.eth1_node_sync_status_percentage,
					message: 'ETH 1.0 connection error',
					status: metricStatus.ERROR
				})
				return;
			}

			this.processEthData(data)
		})
	}

	processEthData(data){
		let message = 'Fully Synced'
		let status = metricStatus.SUCCESS
		
		if(data?.eth1_node_sync_status_percentage < 100){
			message = `Sync in progress (${(100/(+data?.head_slot + +data?.sync_distance)*(+data?.head_slot)).toFixed(2)}%)`
			status = metricStatus.PROCESSING
		}

		this.dispatch('eth.health', {
			...data,
			message: message,
			status: status
		})
	}

	processBeaconData(data){
		let message = 'Fully Synced'
		let status = metricStatus.SUCCESS
		
		if(+data?.sync_distance > 1){
			message = `Sync in progress (${(100/(+data?.head_slot + +data?.sync_distance)*(+data?.head_slot)).toFixed(2)}%)`
			status = metricStatus.PROCESSING
		}

		this.dispatch('beacon.health', {
			...data,
			total_slots: +data?.head_slot + +data?.sync_distance,
			message: message,
			status: status
		})
	}
}

const instance = new BeaconNode();
export default instance;