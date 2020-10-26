export default {
	'/onboarding': {
		header: [],
		showProgress: false
	},
	'/onboarding/health': {
		header: [],
		showProgress: false
	},
	'/onboarding/syncing': {
		header: ['health'],
		showProgress: false
	},
	'/onboarding/overview': {
		header: ['health', 'mainnet', 'beacon'],
		showProgress: false
	},
	'/onboarding/duties': {
		header: ['health', 'mainnet', 'beacon'],
		showProgress: true
	},
	'/onboarding/validators': {
		header: ['health', 'mainnet', 'beacon'],
		showProgress: true
	},
	'/onboarding/mnemonic': {
		header: ['health', 'mainnet', 'beacon', 'validators'],
		showProgress: true
	},
	'/onboarding/mnemonic/confirm': {
		header: ['health', 'mainnet', 'beacon', 'validators'],
		showProgress: true
	},
	'/onboarding/confirm': {
		header: ['health', 'mainnet', 'beacon', 'validators', 'mnemonic'],
		showProgress: true
	},
	'/onboarding/funding': {
		header: ['health', 'mainnet', 'beacon', 'validators', 'mnemonic', 'account'],
		showProgress: true
	}
}