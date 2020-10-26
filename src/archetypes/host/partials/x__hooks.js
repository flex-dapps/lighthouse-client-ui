import React, { useState, useEffect } from 'react'
import { HostStore } from '@store'

export const useHealth = type => {
	const [ data, setData ] = useState({})
	const { state } = HostStore()

	useEffect(() => {
		setValues(state.health[type])
	}, [state.health[type])

	return data
}
