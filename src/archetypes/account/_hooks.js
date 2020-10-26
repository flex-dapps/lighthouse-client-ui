import { useState, useEffect, useMemo } from 'react'
import { AccountStore } from '@store'

export const useStatus = () => {
	const { state, subscribe } = AccountStore()
	const [ data, setData ] = useState(state?.status)

	useEffect(() => {
		let sub = subscribe(`status`, setData)
		return () => sub.unsubscribe()
	}, []) // eslint-disable-line

	return useMemo(() => data, [data])
}
