import React from 'react'
import styled from 'styled-components'
import { Button } from '@components'
import { AccountStore } from '@store'

export default styled(
	({className, rest}) => {
		
		const { state, trigger } = AccountStore()

		switch (state.status) {
			case 'DISCONNECTED': return <Button compact onClick={() => trigger('connect')} className={className} {...rest}>Connect</Button>
			case 'CONNECTING': return <Button compact className={className} {...rest}>CONNECTING...</Button>
			case 'CONNECTED': return <Button compact onClick={() => trigger('disconnect')} className={className} {...rest}>Disconnect</Button>
			case 'ERROR': return <Button compact className={className} {...rest}>ERROR</Button>
			default: return null
		}

		
	})`
	
	`