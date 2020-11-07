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
}

const instance = new ValidatorClient();
export default instance;
