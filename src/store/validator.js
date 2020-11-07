import Store from '@libs/store'
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5'
import { downloadFile, copyToClipboard, printString, numberToMaxDb } from '@util/helpers'
import { StakingPeriods } from '@app/App.config'
import { Notification } from '@components'
import { AppStore, HostStore } from '@store'
import { Validator } from '@libs/lighthouse'

const initialState = {
	mnemonic: {
		phrase: null,
		confirmed: false,
	},
	web3: null,
	validators: {},	
	horizon: 'ANNUALLY',
	rates: {},
	currency: 'GBP',
	stakeRequired: 0,
	stakeFunded: 0,
	reward: {
		eth: 0,
		fiat: 0,
		percent: 0,
		multiplier: process.env.REACT_APP_STAKING_REWARD_MULTIPLIER || 50 
	},
	cost: 0,
	keystore: {
		object: null,
		hash: null
	},
	vc: null,
	bn: null,
	network: {}
}

const triggers = {
	
	calculateTotals: async ({state, set}) => {
		// calculate stake
		const stake = Object.keys(state?.validators).length * state.network?.eth_per_validator
		set('stakeRequired', numberToMaxDb(stake||0))

		// calculate current funding
		const funded = Object.values(state?.validators||{}).filter(val => val.status === 'FUNDED').length * state.network?.eth_per_validator
		set('stakeFunded', numberToMaxDb(funded||0))

		// calculate cost
		const cost = stake * state?.rates[state?.currency]
		set('cost', cost||0)

		// calculate returns
		const rewardEth = StakingPeriods[state?.horizon].calculate(state.reward.multiplier) * Object.keys(state?.validators).length
		set('reward.eth', rewardEth)
		set('reward.percent', 100/stake*rewardEth)
		set('reward.fiat', rewardEth * state?.rates[state?.currency])
	},

	validator: {

		add: ({set, state}, name) => {
			// id is a non-persistent internal reference for front-end session use,
			// not intrinsicly coupled to the validator instance in lighthouse
			const id = uuidv4()
			
			// create validator instance
			// validator needs web3 access, and requires BN and VC APIs
			const validatorInstance = new Validator(state.web3, state.bn, state.vc)
			
			// subscribe to validator events
			validatorInstance.on('update', val => set(`validators.${id}`, val))
			validatorInstance.on('error', ({message, fatal}) => Notification[!!fatal ? 'error' : 'warning'](message))

			// initialize validator, including params
			// this is used to init an local validator, ready for creation via the LH API
			validatorInstance.init({
				name: name || `Validator LH-${md5(id).substr(0, 8)}`,
				eth: state.network?.eth_per_validator,
				mnemonic: state.mnemonic?.phrase,
				preview_url: state.network?.preview_url
			})

			set(`validators.${id}`, validatorInstance)
		},

		remove: ({unset, state}, id) => {
			state.validators[id].deregister(() => {
				unset(`validators.${id}`)
			})
		}
	},

	// trigger creation of all validators
	createValidators: async ({state}) => {
		
		// get all validators
		const validators = Object.values(state?.validators)

		// display processing notification 
		const _n = Notification.processing({
			title: `Creating ${validators.length} validator${validators.length !== 1 ? 's' : ''}`,
			text: 'This process may take some time, depending on how many validators are being created.',
			duration: -1
		})

		await Promise.all(
				Object.values(state?.validators)
					.map((validator, index) => new Promise(async resolve => {
						await validator.create(index, state.mnemonic?.phrase)
						resolve()
					}))
			)
			.then((values) => {
				_n.success({
					title: `${validators.length} validator${validators.length !== 1 ? 's' : ''} created`, 
					text: 'You are ready to deposit your stake'
				})
			})
	},
	
	mnemonic: {
		print: ({state}) => {
			Notification.success('Seed phrase sent to printer')
			setTimeout(() => printString(state?.mnemonic?.phrase), 200)
		},
		download: ({state}) => {
			const confirmed = window.confirm('Warning: Saving the file to a public or unencrypted partition can result in loss of funds! Confirm you wish to downlaod the seed phrase.')
			if(confirmed){
				Notification.success('Seed phrase file created')
				downloadFile('lighthouse_seed.txt', state?.mnemonic?.phrase)
			}
		},
		copy: ({state}) => {
			const confirmed = window.confirm('Warning: Copying to clipboard can result in lost funds if the clipboard is accessed maliciously or accidentally by another program! Confirm you wish to copy the seed prhase.')
			if(confirmed){
				const notification = Notification.processing('Copying...')
				setTimeout(() => notification.success({title: 'Seed phrase copied'}), 1000)
				copyToClipboard(state?.mnemonic?.phrase)
			}
		}
	}
}

const subscribers = {
	horizon: (val, {trigger}) => trigger('calculateTotals'),
	currency: (val, {trigger}) => trigger('calculateTotals'),
	rates: (val, {trigger}) => trigger('calculateTotals'),
	validators: (val, {trigger}) => trigger('calculateTotals'),
	'network.eth_per_validator': (val, {trigger}) => trigger('calculateTotals'),
}

const init = ({trigger, set}) => {
	AppStore().subscribe('conversionRates', rates => set('rates', rates))
	AppStore().subscribe('network', network => set('network', network))
	AppStore().subscribe('currency', currency => set('currency', currency))
	AppStore().subscribe('web3', web3 => set('web3', web3))

	// set the validator client
	HostStore().subscribe('lighthouse.vc.api', vc => set('vc', vc))
	HostStore().subscribe('lighthouse.bn.api', bn => set('bn', bn))

	// TESTING
	// setTimeout(() => {
	// 	trigger('validator.add', 'My First Validator')
	// 	//trigger('validator.add')
	// 	//trigger('validator.add')
	// 	//trigger('validator.add')
	// }, 2000)
}


export default () => Store('validatorstore', {
	initialState: initialState,
	triggers: triggers,
	subscribers: subscribers,
	init: init
})
