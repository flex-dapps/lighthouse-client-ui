import Lighthouse from './_lighthouse'
import { metricStatus, defaultMetricValues } from './_common'

const ValidatorClient = class extends Lighthouse{
	
	_connectionPath = '/validators'
	#_auth_token

	set apiKey(val){
		this.#_auth_token = val
	}

	async _query(path, method='GET', params={}){
		const uri = `${this._address}:${this._port}/lighthouse${path}`

		const opts = {
			method: method,
			headers: new Headers({
				'Authorization': `Basic ${this.#_auth_token}`,
				'Content-Type': 'application/json'
			}),
		}

		if(method === 'POST' || method === 'PATCH'){
			opts.body = JSON.stringify(params)
		}

		return await fetch(uri, opts)
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
		this.subscribe('/health', (data, cbs, error) => {
			if(error){
				cbs.unsubscribe()
				this.dispatch('metrics.disk', {...defaultMetricValues, status: metricStatus.CONCERN, message: 'Disk Unavailable'})
				this.dispatch('metrics.cpu', {...defaultMetricValues, status: metricStatus.CONCERN, message: 'CPU Unavailable'})
				this.dispatch('metrics.ram', {...defaultMetricValues, status: metricStatus.CONCERN, message: 'RAM Unavailable'})
				this.dispatch('metrics.network', {...defaultMetricValues, status: metricStatus.CONCERN, message: 'Network Unavailable'})
				this.dispatch('metrics.host', {...defaultMetricValues, status: metricStatus.CONCERN, message: 'Diagnostics Unavailable'})
				return;
			}

			this.processHealth(data)
		})
	}

	async createValidator(validator, mnemonic, offset=0){
		return await this.query(
			'/validators/mnemonic', 
			'POST', 
			{
				mnemonic: mnemonic,
				key_derivation_path_offset: offset,
				validators: [validator]
			}
		)
		.then(data => {
			return data[0]
		})
	}




	processHealth(data){
		// fake data
		data = {
			pid: 1476293,
			pid_num_threads: 19,
			pid_mem_resident_set_size: 4009984,
			pid_mem_virtual_memory_size: 1306775552,
			sys_virt_mem_total: 33596100608,
			sys_virt_mem_available: 23073017856,
			sys_virt_mem_used: 9346957312,
			sys_virt_mem_free: 22410510336,
			sys_virt_mem_percent: 24.322334,
			sys_loadavg_1: 0.98,
			sys_loadavg_5: 0.98,
			sys_loadavg_15: 1.01
		}

		this.processHealth_Disk(data)
		this.processHealth_Cpu(data)
		this.processHealth_Ram(data)
		this.processHealth_Network(data)
		this.processHealth_Host(data)
	}

	processHealth_Disk(){
		this.dispatch('metrics.disk', {...defaultMetricValues})
	}

	processHealth_Cpu(){
		this.dispatch('metrics.cpu', {...defaultMetricValues})
	}

	processHealth_Ram(data){
		const percent = data?.sys_virt_mem_percent.toFixed(0)
		const used = (data?.sys_virt_mem_used * 0.000000001).toFixed(1)
		let status = metricStatus.UNKNOWN
		let message = 'Unavailable'

		if(percent < 25){
			status =  metricStatus.SUCCESS
			message = 'RAM utilization is sufficient to start validation process'
		}else if(percent < 50){
			status =  metricStatus.CONCERN
			message = 'RAM utilization is ?'
		}else{
			status =  metricStatus.FAILURE
			message = 'Please ensure your RAM utilization is sufficient prior to validating'
		}

		this.dispatch('metrics.ram', {
			status: status,
			message: message,
			metric1: `${percent}% Utilization`,
			metric2: `${used} GB`,
			dataPoints: []
		})
	}

	processHealth_Network(){
		this.dispatch('metrics.network', {...defaultMetricValues})
	}

	processHealth_Host(){
		this.dispatch('metrics.host', {...defaultMetricValues})
	}
}

const instance = new ValidatorClient();
export default instance;
