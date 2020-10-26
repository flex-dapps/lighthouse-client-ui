import Store from '@libs/store'
import { AppStore } from '@store'
import { Notification } from '@components'

export const Status = {
	DISCONNECTED: 'DISCONNECTED',
	CONNECTING: 'CONNECTING',
	CONNECTED: 'CONNECTED',
	ERROR: 'ERROR',
}

const initialState = {
	web3: null,
	network: {},
	address: null,
	balance: null,
	status: Status.DISCONNECTED
}

const triggers = {
	connect: async ({state, set, trigger}) => {
		if(!state.web3){
			set('status', Status.ERROR)
			Notification.error('No web3!...')
			return;
		}

		set('status', Status.CONNECTING)

		window.ethereum.enable()
			.then(accounts => {
				set('address', accounts[0])
				set('status', Status.CONNECTED)
			})
			.catch(error => {
				set('status', Status.ERROR)
				Notification.error('TODO: handle ethereum.enable error', error.message)
			})
		
	},
	disconnect: async ({state, set}) => {
		set('status', Status.DISCONNECTED)
	}, 
	updateBalance: ({state, set}) => {
		state.web3.eth.getBalance(state.address)
			.then(wei => set('balance', parseFloat(state.web3.utils.fromWei(wei)).toFixed(2) ))
	}
}

const subscribers = {
	status: (status, { set, trigger }) => {
		if(status === Status.DISCONNECTED){
			set('address', null)
			set('balance', null)
		}else if(status === Status.CONNECTED){
			trigger('updateBalance')
			window.ethereum.on('accountsChanged', accounts => {
				set('address', accounts[0])
				trigger('updateBalance')
			})
		}
		else if(status === Status.ERROR){
			set('address', null)
			set('balance', null)
		}
	}
}

const init = async ({hydrate, set, trigger, state}) => {
	AppStore().subscribe('web3', web3 => set('web3', web3))
	AppStore().subscribe('network', network => set('network', network))
}

export default () => Store('accountstore', {
	initialState: initialState,
	triggers: triggers,
	subscribers: subscribers,
	init: init
})
