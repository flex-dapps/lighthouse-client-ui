// network config default values
const networkBaseConfig = {
	name: "UNDEFINED",
	enabled: false,
	eth_per_validator: 32,
	preview_url: 'https://etherscan.io'
}

// available networks
// https://chainid.network/chains.json
export const Networks = {
	1: {
		...networkBaseConfig,
		name: "Mainnet", 
		enabled: true
	},
	3: {
		...networkBaseConfig,
		name: 'Ropsten'
	},
	4: {
		...networkBaseConfig,
		name: 'Rinkeby'
	},
	5: {
		...networkBaseConfig,
		name: 'Goerli', 
		enabled: true, 
		preview_url: 'https://goerli.etherscan.io' 
	},
	42: {
		...networkBaseConfig,
		name: 'Kovan'
	}
}

// default seed languages
export const SeedLanguages = {
	en: {
		name: 'English',
		wordlist: 'english'
	},
	ja: {
		name: 'Japanese',
		wordlist: 'japanese'
	},
	es: {
		name: 'Spanish',
		wordlist: 'spanish'
	},
	it: {
		name: 'Italian',
		wordlist: 'italian'
	},
	fr: {
		name: 'French',
		wordlist: 'french'
	},
	ko: {
		name: 'Korean',
		wordlist: 'korean'
	},
	'zh-Hant': {
		name: 'Chinese (traditional)',
		wordlist: 'chinese_traditional'
	},
	'zh-Hans': {
		name: 'Chinese (simplified)',
		wordlist: 'chinese_simplified'
	},
}

// user locale based settings
export const Locales = {
	'us-US': {
		currency: 'USD'
	},
	'en-DE': {
		currency: 'EUR'
	},
	'en-AU': {
		currency: 'AUD'
	},
	'zh-CN': {
		currency: 'CNY'
	},
	'ja-JP': {
		currency: 'JPY'
	},
	'en-GB': {
		currency: 'GBP'
	}
}

// calculations for staking periods
export const StakingPeriods = {
	WEEKLY: {
		key: 'WEEKLY',
		value: 'Weekly',
		calculate: annualRewards => annualRewards / 52
	},
	MONTHLY: {
		key: 'MONTHLY',
		value: 'Monthly',
		calculate: annualRewards => annualRewards / 12
	},
	ANNUALLY: {
		key: 'ANNUALLY',
		value: 'Annually',
		calculate: annualRewards => annualRewards
	}
}