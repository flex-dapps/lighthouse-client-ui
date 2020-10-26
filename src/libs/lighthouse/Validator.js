import Events from './_events'
import { validatorState } from './_common'

export default class Validator extends Events{
	// api objects
	#web3
	#bnApi
	#vcAPi

	// creation params
	#mnemonic
	#eth1_deposit_tx_data
	#txHash
	txUrl
	#preview_url

	// lighthouse params
	#enabled
	#description
	#deposit_gwei = '32000000000'
	#voting_pubkey

	// acconut params
	#_balance = '0'

	// beacon values
	// TODO
		
	// status values & flags
	#_status = validatorState.AWAITING_CREATION
	#_created = false
	#_funded = false
	#_active = false
	#_validating = false

	constructor(web3, bnApi, vcAPi){
		super()
		this.#web3 = web3
		this.#bnApi = bnApi
		this.#vcAPi = vcAPi
	}

	deregister(cb=()=>{}){
		this.deregisterEvents()
		cb()
	}

	// init empty validator, not yet created
	init(props){
		this.name = props.name
		this.eth = props.eth
		this.#mnemonic = props.mnemonic
		this.#preview_url = props.preview_url
		this._setStatus(validatorState.AWAITING_CREATION)
	}

	// hydrate based on key
	async hydrate(key){
		return await this.#vcAPi
			.query(`/validators/${key}`)
			// woo created
			.then(({enabled, voting_pubkey}) => {
				// set validator values
				this.#enabled = enabled
				this.#voting_pubkey = voting_pubkey
				
				// TODO
				this.#_created = true
				this.#_funded = true
				this.#_active = true
				this.#_validating = true
				this._setStatus(validatorState.VALIDATING)

				// TODO: start watching metrics
			})
			// hmmm, not
			.catch((e) => {
				this._triggerWarning(`Failed to fetch validator by voting_pubkey: ${key}`)
			})
	}

	

	// GETTERS / SETTERS
	set name(val) {
		this.#description = val;
		this._triggerUpdate()
	}
	get name(){ 
		return this.#description
	}
	set eth(val) {
		if(this.#_created === false){
			this.#deposit_gwei = this.#web3?.utils?.toWei(val?.toString(), 'gwei');
		}else{
			this._triggerWarning('Cannot change deposit amount of an existing validator')
		}
	}
	get eth(){ 
		return parseFloat(this.#web3.utils.fromWei(this.#deposit_gwei, 'gwei'), 0)
	}
	get status(){ 
		return this.#_status 
	}
	set txHash(val) {
		this.#txHash = val;
		if(val){
			this.txUrl = `${this.#preview_url}/tx/${val}` 
			this._triggerUpdate()
		}
	}
	get balance(){
		return parseFloat(this.#web3.utils.fromWei(this.#_balance, 'gwei'), 0)
	}


	

	// CREATON / FUNDING OF NEW VALIDATORS

	// create validator using the vc api
	async create(offset=0, mnemonic){
		this._setStatus(validatorState.IS_CREATING)

		if(this.#vcAPi){
			return await this.#vcAPi
				.createValidator(
					{
						enable: true,
						description: this.#description,
						deposit_gwei: this.#deposit_gwei
					},
					mnemonic,
					offset
				)
				// woo created
				.then(({enabled, deposit_gwei, eth1_deposit_tx_data, voting_pubkey}) => {
					
					// set validator values
					this.#enabled = enabled
					this.#deposit_gwei = deposit_gwei
					this.#eth1_deposit_tx_data = eth1_deposit_tx_data
					this.#voting_pubkey = voting_pubkey
					
					// created
					this.#_created = true
					this._setStatus(validatorState.AWAITING_FUNDING)

					//this.dispatchNotification(`Validator Created`)
				})
				// hmmm, not
				.catch(e => {
					this._setStatus(validatorState.CREATING_ERROR)
					this._triggerWarning(e.message)
				})
		}else{
			this._setStatus(validatorState.CREATING_ERROR)
			this._triggerWarning(`Validator Client API not available`)
		}
	}

	// fund validator address
	async fund(){
		// reset params
		this.#_funded = false
		this.txHash = null	
		this._setStatus(validatorState.IS_FUNDING)
		
		// we need the contract address based on network
		const spec = await this.#bnApi.query('/eth/v1/config/spec')
		const contract_address = spec.DEPOSIT_CONTRACT_ADDRESS

		// tx values
		const account = (await this.#web3.eth.getAccounts())[0];
		const data = this.#eth1_deposit_tx_data
		const to = contract_address
		const value = this.#web3.utils.toWei(this.#deposit_gwei, 'gwei')
		
		// tx props object
		const props = {
			from: account,
			to: to,
			value: value,
			data: data
		}

		// attempt tx
		this.#web3.eth
			.sendTransaction(props)
			// save tx hash once available
			.on('transactionHash', hash => {
				this.txHash = hash	
			})
			// update internal state on completion 
			.on('receipt', () => {
				this.#_funded = true
				this.#_balance = this.#deposit_gwei
				this._setStatus(validatorState.AWAITING_ACTIVATION)
			})
			// handle errors 
			.on('error', error => {
				//console.log('error: ', error)
				//this.#_funded = false
				//this._setStatus(validatorState.ERROR)
				this._setStatus(validatorState.FUNDING_ERROR)
			})
	}

	// todo
	// shoud await the 
	activate(){
		// requirements:
		// beacon chain + eth1 synced
		// is created
		// is funded
		// status = await activation

		// pass: activate
		// fail: ... nothing?

		//this._setStatus(validatorState.VALIDATING)
		//this.#_active = true
	}


	
	

	

	// update status & trigger callback
	_setStatus(status){
		if(Object.values(validatorState).includes(status)){
			this.#_status = status
			this._triggerUpdate()
		}else{
			this._triggerWarning(`Cannot set status ${status}`)
		}
	}





	// TRIGGERS
	_triggerUpdate(){
		this.dispatch('update', this)
	}

	_triggerWarning(msg){
		this.dispatch('error', {
			message: msg,
			fatal: false
		})
	}

	_triggerError(msg){
		this.dispatch('error', {
			message: msg,
			fatal: true
		})
	}
}