import Connect from './Connect'
import Health from './Health'
import Syncing from './Syncing'
import Partial from './partials'
import Disclosure from './disclosures'
import * as hooks from './_hooks'

export default {
	Connect,
	Health,
	Syncing,
	Partial,
	Disclosure,
	...hooks
}