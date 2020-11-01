import Web3 from 'web3';
import { v4 as uuidv4 } from 'uuid';
import { pull } from 'lodash';
import Store from '@libs/store'
import { userLocal } from '@util/helpers'
import { Networks, Locales } from '@app/App.config'
import { LogStore } from '@store'

const ethereum = window.ethereum
ethereum.autoRefreshOnNetworkChange = false
const web3 = new Web3(ethereum)

const loaders = []

const initialState = {
	ethereum: ethereum,
	web3: null,
	network: {},
	account: null,
	conversionRates: {},
	locale: null,
	currency: null,
	loading: true,
	addLog: () => {},
}

const hydration = {
	// rates required to make $ calculations
	conversionrates: async ({set, state}, id) => {
		const currencies = Object.values(Locales).map(({currency}) => currency).join(',')
		const rates = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=${currencies}`).then(r => r.json())
		set('conversionRates', rates)
	},

	// determine the users' localization
	locale: async ({set}) => {
		const locale = userLocal()
		set('locale', locale||Object.keys(Locales)[0])
	},
	
	// fetch network || not available? error
	network: async ({state, set, hydrate}) => {
		const chainId = await web3.eth.getChainId()
		const network = Networks[chainId]

		// no network or unavailable
		if(!network || network?.enabled !== true){
			set('network', null)
		}
		
		// network found
		else{
			set('network', {id: chainId, ...network})
		}
	}
}

const triggers = {
	init: ({set, trigger, hydrate}) => {
		trigger('loading', {
			message: 'Initialising app',
			ready: async loader => {
				
				// hydrate conversion rates
				trigger('loading', {
					message: 'Loading conversion rates',
					ready: loader => {
						hydrate('conversionrates', () => {
							loader.success('Conversion rates hydrated')
						})
					}
				})

				// configure localization
				trigger('loading', {
					message: 'Configuring localization',
					ready: loader => {
						hydrate('locale', () => {
							loader.success('Localization configured')
						})
					}
				})

				// Web3
				trigger('loading', {
					message: 'Connecting to web3 network',
					ready: loader => {
						hydrate('network', ({state, set}) => {
							loader.success(`Network connected: ${state?.network?.name}`)
							set('web3', web3)
							// watch for network updates
							window.ethereum.on('chainChanged', () => hydrate('network'))
						})
					}
				})

				// timeout here for aesthetic purposed only
				// sometimes everything loads too fast and the UI feels rushed
				setTimeout(() => {
					loader.error(`App initialized`)
				}, 2000)
			}
		})

	},

	loading: ({trigger, set}, {message, ready=()=>{}}) => {
		const id = uuidv4()
		loaders.push(id)
		set('loading', true)
		trigger('log', { message: message })
		ready({
			success: async message => {
				trigger('log', { message: message, type: 'SUCCESS' })
				pull(loaders, id)
				if(loaders.length <= 0) {
					set('loading', false)
				}
			},
			error: async message => {
				trigger('log', { message: message, type: 'ERROR' })
				// throw error?
			},
		})
	},

	log: ({state}, log) => {
		state.addLog(log)
	}
}

const subscribers = {
	// set currency on locale change 
	locale: (val, {set}) => set('currency',  Locales[val]?.currency||Object.values(Locales)[0]?.currency),
}

const init = ({set, trigger, hydrate}) => {
	// init stores
	const logStore = LogStore()
	set('addLog', props => logStore.set('item', props))
}

export default () => Store('appstore', {
	initialState: initialState,
	persistent: ['locale', 'currency'],
	hydration: hydration,
	triggers: triggers,
	subscribers: subscribers,
	init: init,
})