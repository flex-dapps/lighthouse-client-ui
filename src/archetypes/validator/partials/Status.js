import React from 'react'
import { Label } from '@components'
import { Validator } from '@archetypes'

export default 
	({
		id, 
		...rest
	}) => {
		const status = Validator.useStatus(id)
		return <Label {...rest}>
			{status?.icon}
			<span>{status?.message}</span>
		</Label>
	}