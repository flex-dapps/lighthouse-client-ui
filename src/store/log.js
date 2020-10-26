import moment from 'moment'
import Store from '@libs/store'

const LogTypes = {
	DEFAULT: 'DEFAULT',
	SUCCESS: 'SUCCESS',
	WARNING: 'WARNING',
	ERROR: 'ERROR',
}


const maxLogLength = 20

const setters = {
	item: ({state}, {message, type=LogTypes.DEFAULT}) => {
		
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

export default () => Store('logstore', {
	initialState: {
		items: []
	},
	setters: setters
})