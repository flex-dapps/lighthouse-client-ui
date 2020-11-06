import Store from '@libs/store'
import { validate, regex } from '@util/helpers'
import { Notification } from '@components'
import { LogStore } from '@store'
import { 
	BeaconNode, 
	ValidatorClient, 
	defaultMetricValues, 
	connectionStatus 
} from '@libs/lighthouse'

export const validationRules = {
	address: {
		'Address required':  val => val !== '',
		'Not a URL or IP address':  val => regex.url(val)
	},
	port: {
		'Port Required':  val => val !== '',
		'Not a valid port':  val => {
			return val > 4000 && val < 9999 
		}
	},
	token: {
		'Token required':  val => !!val 
	},
	device: {
		'Device required':  val => !!val 
	},
	name: {
		'Name required':  val => !!val 
	},
}

const initialState = {
	address: 'http://127.0.0.1',
	port_bn: 5052,
	port_vc: 5062,
	token: null,
	device: null,
	name: null,
	errors: {},
	validated: false,
	status: connectionStatus.DISCONNECTED,


	lighthouse: {
		bn: {
			protocol: 'http',
			address: '127.0.0.1',
			port: 5052,
			api: BeaconNode,
			spec: {},
			status: connectionStatus.DISCONNECTED,
		},
		vc: {
			protocol: 'http',
			address: '127.0.0.1',
			port: 5062,
			token: null,
			api: ValidatorClient,
			status: connectionStatus.DISCONNECTED,
		},
		status: connectionStatus.DISCONNECTED,
		device: null,
		name: null,
		persist: false,
		advanced: false
	},

	metrics: {
		disk: { ...defaultMetricValues },
		cpu: { ...defaultMetricValues },
		ram: { ...defaultMetricValues },
		network: { ...defaultMetricValues },
		host: { ...defaultMetricValues },
		beacon: {
			status: 'CONCERN',
		},
		eth: {
			status: 'CONCERN',
		}
	},
}

const triggers = {
	connect: async ({trigger, state, set, history}) => {
		set('lighthouse.status', connectionStatus.CONNECTING)

		const { bn, vc, advanced } = state.lighthouse

		// formulate the URL's for BN and VC
		// if advanced settings is false, use the BN protocol/address for the VC
		const bn_uri = `${bn?.protocol}://${bn?.address}`
		const vc_uri = !!advanced 
			? `${vc?.protocol}://${vc?.address}` 
			: `${bn?.protocol}://${bn?.address}`

		// trigger connection to beacon node
		bn.api.connect(bn_uri, bn?.port)
		
		// trigger connection to validator client
		vc.api.apiKey = vc?.token
		vc.api.connect(vc_uri, vc?.port)	
	}
}

const setters = {
	error: ({state, set}, {key, errors}) => {
		state.errors[key] = errors
		set('errors', state.errors)
	},
}

const subscribers = {
	
	'lighthouse.bn.status': (status, {state, set}) => {
		switch (status) {
			case connectionStatus.CONNECTING:
				set('lighthouse.status', connectionStatus.CONNECTING)
				state.logStore.set('item', {message: 'Beacon Node connecting'})
				break;
			case connectionStatus.CONNECTED:
				state.logStore.set('item', {message: 'Beacon Node connected'})
				if(state.lighthouse.vc.status === connectionStatus.CONNECTED){
					set('lighthouse.status', connectionStatus.CONNECTED)
				}
				break;
			case connectionStatus.ERROR:
				set('lighthouse.status', connectionStatus.ERROR)
				state.logStore.set('item', {message: 'Beacon Node connection error'})
				Notification.warning({
					title: `Could not connect to the Lighthouse <strong>Beacon Node</strong> on <strong>${state.lighthouse?.bn?.protocol}://${state.lighthouse?.bn?.address}:${state.lighthouse?.bn?.port}</strong>`,
					text: 'Make sure your beacon node client is running and your address/ports are correct',
				})
				set('error', {
					key: 'address',
					errors: [`Could not connect to the Lighthouse <strong>Beacon Node</strong> on <strong>${state.lighthouse?.bn?.protocol}://${state.lighthouse?.bn?.address}:${state.lighthouse?.bn?.port}</strong>`]
				})
				break;
			case connectionStatus.DISCONNECTED:
				set('lighthouse.status', connectionStatus.DISCONNECTED)
				state.logStore.set('item', {message: 'Beacon Node diconnected'})
				break;
			default:
				// statements_def
				break;
		}
	},
	
	'lighthouse.vc.status': (status, {state, set}) => {
		switch (status) {
			case connectionStatus.CONNECTING:
				set('lighthouse.status', connectionStatus.CONNECTING)
				state.logStore.set('item', {message: 'Validator Client connecting'})
				break;
			case connectionStatus.CONNECTED:
				state.logStore.set('item', {message: 'Validator Client connected'})
				if(state.lighthouse.bn.status === connectionStatus.CONNECTED){
					set('lighthouse.status', connectionStatus.CONNECTED)
				}
				break;
			case connectionStatus.ERROR:
				set('lighthouse.status', connectionStatus.ERROR)
				state.logStore.set('item', {message: 'Validator Client connection error'})
				Notification.warning({
					title: `Could not connect to the Lighthouse <strong>Validator Client</strong> on <strong>${state.lighthouse?.vc?.protocol}://${state.lighthouse?.vc?.address}:${state.lighthouse?.vc?.port}</strong>`,
					text: 'Make sure your validator client is running and your address/ports are correct',
				})
				set('error', {
					key: 'address',
					errors: [`Could not connect to the Lighthouse <strong>Validator Client</strong> on <strong>${state.lighthouse?.vc?.protocol}://${state.lighthouse?.vc?.address}:${state.lighthouse?.vc?.port}</strong>`]
				})
				break;
			case connectionStatus.DISCONNECTED:
				set('lighthouse.status', connectionStatus.DISCONNECTED)
				state.logStore.set('item', {message: 'Validator Client diconnected'})
				break;
			default:
				// statements_def
				break;
		}
	},

	'lighthouse.status': (status, {state, history}) => {
		switch (status) {
			case connectionStatus.CONNECTED:
			Notification.success(`Connected to <strong>Lighthouse</strong>`)

				const vc = state.lighthouse.vc.api

				vc && vc.query('/validators')
					.then(validators => {
						history.push(validators.length > 0 ? '/' : '/welcome')
						//history.push('/welcome')
					})
					.catch(e => {
						history.push('/welcome')
					})
				
				
				break;
			case connectionStatus.DISCONNECTED:
				Notification.warning(`disconnected from the <strong>Lighthouse Client</strong>`)
				break;
			default:
				// statements_def
				break;
		}
	},

	'lighthouse.persist': (persist, {cache}) => {
		cache.persist(persist)
	},

	// watch errors, set validity bit
	errors: (val, {state, set}) => {
		const errors = []
			.concat(
				state?.errors?.address, 
				state?.errors?.port_bn, 
				state?.errors?.port_vc, 
				state?.errors?.token, 
				state?.errors?.device, 
				state?.errors?.name,
			)
			.filter(s=>s)

		set('validated', errors.length <= 0)
	},
	
	// re-validate on any changes to connection fields
	address: (val, {set}) => set('errors.address', validate(val, validationRules.address)),
	port_bn: (val, {set}) => set('errors.port_bn', validate(val, validationRules.port)),
	port_vc: (val, {set}) => set('errors.port_vc', validate(val, validationRules.port)),
	token: (val, {set}) => set('errors.token', validate(val, validationRules.token)),
	name: (val, {set}) => set('errors.name', validate(val, validationRules.name)),
	device: (val, {set}) => set('errors.device', validate(val, validationRules.device)),
}

export default () => Store('hoststore', {
	initialState: initialState,
	persistent: [
		'lighthouse.bn.protocol',
		'lighthouse.bn.address',
		'lighthouse.bn.port',
		'lighthouse.vc.protocol',
		'lighthouse.vc.address',
		'lighthouse.vc.port',
		'lighthouse.vc.token',
		'lighthouse.device',
		'lighthouse.name',
		'lighthouse.persist',
		'lighthouse.advanced',
	],
	triggers: triggers,
	setters: setters,
	subscribers: subscribers,
	init: ({set, state, trigger}) => {
		set('lighthouse.bn.api', BeaconNode)
		set('lighthouse.vc.api', ValidatorClient)

		set('logStore', LogStore(), ()=>{
			//trigger('connect')
		})

		// configure beancon node api
		const bn = state.lighthouse.bn.api
		bn.on('eth.health', data => set('metrics.eth', data))
		bn.on('beacon.health', data => set('metrics.beacon', data))
		bn.on('status', status => set('lighthouse.bn.status', status))
		bn.on('connected', spec => set('lighthouse.bn.spec', spec))
		
		
		// configure validator client api
		const vc = state.lighthouse.vc.api
		vc.on('metrics.disk', data => set('metrics.disk', data))
		vc.on('metrics.cpu', data => set('metrics.cpu', data))
		vc.on('metrics.ram', data => set('metrics.ram', data))
		vc.on('metrics.network', data => set('metrics.network', data))
		vc.on('metrics.host', data => set('metrics.host', data))
		vc.on('status', status => set('lighthouse.vc.status', status))
	}
})