import { useState, useEffect, useMemo } from 'react'
import { get } from 'lodash'
import { HostStore } from '@store'

export const useHealth = type => {
	const { state, subscribe } = HostStore()
	const [ data, setData ] = useState(get(state, `metrics.${type}`)||{})

	useEffect(() => {
		let sub = subscribe(`metrics.${type}`, setData)
		return () => sub.unsubscribe()
	}, []) // eslint-disable-line

	return useMemo(() => data, [data])
}
