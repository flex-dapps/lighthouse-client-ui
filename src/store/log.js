import moment from 'moment'
import Store from '@libs/store'

const LogTypes = {
	DEFAULT: 'DEFAULT',
	PROCESSING: 'PROCESSING',
	SUCCESS: 'SUCCESS',
	WARNING: 'WARNING',
	ERROR: 'ERROR',
}


const maxLogLength = 20

const setters = {
	item: ({state}, {message, type=LogTypes.PROCESSING}) => {
		
		if(message){
			state.items.unshift({
				timestamp: moment().unix(),
				message: message,
				type: type
			})
			state.items.slice(0, maxLogLength);
		}
	},
}

const logstore = () => Store('logstore', {
	initialState: {
		items: []
	},
	setters: setters
})

logstore.types = LogTypes

export default logstore